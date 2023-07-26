<template>
	<div class="sql-panel-container" :class="{ 'has-header': showHeader }">
		<v-table class="table" :showResize="true" v-model:headers="headers" :items="items" :loading="loading"
			@update:sort="onSortUpdate" v-model:sort>
			<template v-for="(header, rowIndex) in headers" v-slot:[`item.${header.value}`]="{ item }">
				<div :key="rowIndex + 'link'" v-if="shouldRenderLink(item[header.value])"
					@click="openLink(item[header.value])" class="custom-link">
					{{ item[header.value] }}
				</div>
				<div :key="rowIndex" v-else> {{ item[header.value] }}</div>
			</template>
		</v-table>
	</div>
</template>
  
<script>
import { useApi } from "@directus/extensions-sdk";

export default {
	props: {
		id: String,
		showHeader: {
			type: Boolean,
			default: false,
		},
		columnWidth: {
			type: String,
			default: "",
		},
	},
	data() {
		return {
			headers: [],
			items: [],
			loading: true,
			sortConfig: {
				by:"",
				desc:"false"
			},
		};
	},
	created() {
		this.fetchData();
	},

	methods: {
		async fetchData() {
			const api = useApi();
			const { data } = await api(`sql-panel-api/${this.id}`);
			this.loading = false;
			let columnWidth = this.columnWidth.split(",").map(parseFloat);
			this.headers = data.headers.map((header, i) => ({
				text: header.text,
				value: header.value,
				width: columnWidth[i],
			}));
			this.items = data.items;
		},
		shouldRenderLink(cellValue) {
			return typeof cellValue === "string" && cellValue.startsWith("http");
		},
		openLink(link) {
			window.open(link, "_blank");
		},
		onSortUpdate(sortEvent) {
			console.log(sortEvent)
			if (sortEvent !== null) {
				this.items.sort((a, b) => {
					const valueA = a[sortEvent.by];
					const valueB = b[sortEvent.by];

					// If the values are strings, use localeCompare for string comparison
					if (typeof valueA === "string" && typeof valueB === "string") {
						return sortEvent.desc ? valueB.localeCompare(valueA) : valueA.localeCompare(valueB);
					}

					// For numerical values, use normal comparison
					return sortEvent.desc ? valueB - valueA : valueA - valueB;
				});
			}
		},
	},
};
</script>
  
<style scoped>
.sql-panel-container {
	width: 100%;
	height: 100%;
	overflow-x: auto;
	overflow-y: auto;
}

.custom-link {
	color: #007bff;
	text-decoration: none;
}
</style>