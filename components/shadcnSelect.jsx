
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function SelectDemo({width="w-[180px]",placeholder="Select Budget",options,className, value, onValueChange}) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className={width}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup className={`text-white ${className} backdrop-blur-md`}>

          {options.map((option) => (
            <SelectItem key={option.value} value={option.value} className="cursor-pointer hover:bg-amber-500 hover:text-black transition-colors">{option.label}</SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

