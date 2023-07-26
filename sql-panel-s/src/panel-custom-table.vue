<template>
	<div class="sql-panel-container" :class="{ 'has-header': showHeader }">
		<table class="custom-table">
			<thead>
				<tr>
					<th v-for="(header, key) in headers" :key="key" class="custom-header">
						{{ header }}
					</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(item, rowIndex) in items" :key="rowIndex" class="custom-row">
					<td v-for="(value, key) in item" :key="key" class="custom-cell">
						<span v-if="shouldRenderLink(value)">
							<a :href="value" target="_blank" class="custom-link">{{ value }}</a>
						</span>
						<span v-else>
							{{ value }}
						</span>
					</td>
				</tr>
			</tbody>
		</table>
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
		};
	},
	created() {
		this.fetchData();
	},

	methods: {
		async fetchData() {
			const api = useApi();
			const { data } = await api(`sql-panel-api/${this.id}`);
			let columnWidth = this.columnWidth.split(",").map(parseFloat);
			data.headers.forEach((header, i) => {
				this.headers[header.value] = header.text;
				header.width = columnWidth[i];
			});
			this.items = data.items;
		},
		shouldRenderLink(cellValue) {
			return typeof cellValue === "string" && cellValue.startsWith("http");
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

.custom-table {
	width: 100%;
	border-collapse: collapse;
}

.custom-header {
	background-color: #f0f0f0;
	border-bottom: 1px solid #ccc;
	padding: 10px;
}

.custom-row:nth-child(even) {
	background-color: #f9f9f9;
}

.custom-cell {
	padding: 10px;
	border-bottom: 1px solid #ccc;
}

.custom-link {
	color: #007bff;
	text-decoration: none;
}
</style>