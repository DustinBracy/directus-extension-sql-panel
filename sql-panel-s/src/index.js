import PanelComponent from './panel.vue';

export default {
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
		}
	],
	minWidth: 12,
	minHeight: 8,
};