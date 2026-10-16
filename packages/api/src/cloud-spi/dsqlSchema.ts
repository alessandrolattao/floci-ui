import type {CapabilitySchema, FieldSchema, ResourceActionName, ServiceSchema, TableColumnSchema} from './types'

const BOOLEAN_OPTIONS = [
    {label: 'Enabled', value: 'true'},
    {label: 'Disabled', value: 'false'},
]

const clusterFilters: FieldSchema[] = [
    {name: 'search', label: 'Search', type: 'text', required: false},
]

const clusterColumns: TableColumnSchema[] = [
    {name: 'name', label: 'Name'},
    {name: 'identifier', label: 'Cluster ID', path: 'id', format: 'code'},
    {name: 'status', label: 'Status', format: 'badge'},
    {name: 'endpoint', label: 'Endpoint', path: 'metadata.endpoint', format: 'code'},
    {name: 'deletionProtection', label: 'Deletion Protection', path: 'metadata.deletionProtectionEnabled', format: 'boolean'},
    {name: 'createdAt', label: 'Created At', format: 'datetime'},
]

const clusterActions: CapabilitySchema<ResourceActionName>[] = [
    {name: 'list', label: 'List clusters', enabled: true, status: 'available', runtimeRequired: true},
    {name: 'create', label: 'Create cluster', enabled: true, status: 'available', runtimeRequired: true},
    {name: 'update', label: 'Update cluster', enabled: true, status: 'available', runtimeRequired: true},
    {name: 'inspect', label: 'Inspect cluster', enabled: true, status: 'available', runtimeRequired: true},
    {name: 'delete', label: 'Delete cluster', enabled: true, status: 'available', runtimeRequired: true},
]

/** Aurora DSQL single-Region clusters: DSQL names each cluster, so creating one takes no identifier. */
export function awsDsqlSchema(): ServiceSchema {
    return {
        cloud: 'aws',
        service: 'dsql',
        displayName: 'Aurora DSQL',
        fields: [
            {
                name: 'deletionProtectionEnabled',
                label: 'Deletion Protection',
                type: 'select',
                required: true,
                defaultValue: 'true',
                description: 'A protected cluster cannot be deleted until protection is turned off.',
                options: BOOLEAN_OPTIONS,
            },
            {
                name: 'name',
                label: 'Name Tag',
                type: 'text',
                required: false,
                description: 'Optional. Stored as the cluster\'s Name tag.',
                validation: {maxLength: 256},
            },
        ],
        actions: ['list', 'create', 'update', 'inspect', 'delete'],
        capabilities: {resourceActions: clusterActions},
        filters: clusterFilters,
        columns: clusterColumns,
        updateFields: [
            {
                name: 'deletionProtectionEnabled',
                label: 'Deletion Protection',
                type: 'select',
                required: false,
                valuePath: 'metadata.deletionProtectionEnabled',
                options: BOOLEAN_OPTIONS,
            },
        ],
    }
}
