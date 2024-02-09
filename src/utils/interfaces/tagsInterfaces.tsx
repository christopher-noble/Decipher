export type TagsValue = {
    values: string[]
    name?: string
}
export interface TagsHelperProps {
    placeholder?: string
    onTags: (value: TagsValue) => void
    values?: string[]
    name?: string
    elementClassName?: string
    cancelProps?: React.SVGProps<SVGSVGElement>
}

export interface CancelProps {
    cancelProps?: React.SVGProps<SVGSVGElement>
}