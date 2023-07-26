import { useApi } from '@directus/extensions-sdk';
import { resolveComponent, openBlock, createElementBlock, normalizeClass, createVNode, createSlots, renderList, withCtx, toDisplayString } from 'vue';

var e=[],t=[];function n(n,r){if(n&&"undefined"!=typeof document){var a,s=!0===r.prepend?"prepend":"append",d=!0===r.singleTag,i="string"==typeof r.container?document.querySelector(r.container):document.getElementsByTagName("head")[0];if(d){var u=e.indexOf(i);-1===u&&(u=e.push(i)-1,t[u]={}),a=t[u]&&t[u][s]?t[u][s]:t[u][s]=c();}else a=c();65279===n.charCodeAt(0)&&(n=n.substring(1)),a.styleSheet?a.styleSheet.cssText+=n:a.appendChild(document.createTextNode(n));}function c(){var e=document.createElement("style");if(e.setAttribute("type","text/css"),r.attributes)for(var t=Object.keys(r.attributes),n=0;n<t.length;n++)e.setAttribute(t[n],r.attributes[t[n]]);var a="prepend"===s?"afterbegin":"beforeend";return i.insertAdjacentElement(a,e),e}}

var css = "\n.sql-panel-container[data-v-2816c889] {\n\twidth: 100%;\n\theight: 100%;\n\toverflow-x: auto;\n\toverflow-y: auto;\n}\n.custom-link[data-v-2816c889] {\n\tcolor: #007bff;\n\ttext-decoration: none;\n}\n";
n(css,{});

var _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};

const _sfc_main = {
	props: {
		id: String,
		showHeader: {
			type: Boolean,
			default: false,
		}
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
			this.headers = data.headers.map((header) => ({
				text: header.text,
				value: header.value,
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
			if (sortEvent !== null) {
				this.loading = true;
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
				this.loading = false;
			}
		},
	},
};
const _hoisted_1 = ["onClick"];

function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_v_table = resolveComponent("v-table");

  return (openBlock(), createElementBlock("div", {
    class: normalizeClass(["sql-panel-container", { 'has-header': $props.showHeader }])
  }, [
    createVNode(_component_v_table, {
      class: "table",
      showResize: true,
      headers: $data.headers,
      "onUpdate:headers": _cache[0] || (_cache[0] = $event => (($data.headers) = $event)),
      items: $data.items,
      loading: $data.loading,
      "onUpdate:sort": [
        $options.onSortUpdate,
        _cache[1] || (_cache[1] = $event => (($data.sortConfig) = $event))
      ],
      sort: $data.sortConfig
    }, createSlots({ _: 2 /* DYNAMIC */ }, [
      renderList($data.headers, (header, rowIndex) => {
        return {
          name: `item.${header.value}`,
          fn: withCtx(({ item }) => [
            ($options.shouldRenderLink(item[header.value]))
              ? (openBlock(), createElementBlock("div", {
                  key: rowIndex + 'link',
                  onClick: $event => ($options.openLink(item[header.value])),
                  class: "custom-link"
                }, toDisplayString(item[header.value]), 9 /* TEXT, PROPS */, _hoisted_1))
              : (openBlock(), createElementBlock("div", { key: rowIndex }, toDisplayString(item[header.value]), 1 /* TEXT */))
          ])
        }
      })
    ]), 1032 /* PROPS, DYNAMIC_SLOTS */, ["headers", "items", "loading", "onUpdate:sort", "sort"])
  ], 2 /* CLASS */))
}
var PanelComponent = /*#__PURE__*/_export_sfc(_sfc_main, [['render',_sfc_render],['__scopeId',"data-v-2816c889"],['__file',"panel.vue"]]);

var index = {
	id: 'sql-panel-s',
	name: 'SQL panel S',
	icon: 'box',
	description: 'Show result of a stored SQL query as a table',
	component: PanelComponent,
	options: [
		{
			field: 'sql',
			name: 'SQL query',
			type: 'string',
			meta: {
				interface: 'input-multiline',
				width: 'full',
			},
		},
		{
			field: 'columnWidth',
			name: 'Coma separated list of column widths',
			type: 'string',
			meta: {
				interface: 'input',
				width: 'full',
			},
		},
	],
	minWidth: 12,
	minHeight: 8,
};

export { index as default };
