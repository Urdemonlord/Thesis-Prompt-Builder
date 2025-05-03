"use client"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface MajorSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const majors = [
  { value: "computer-science", label: "Computer Science" },
  { value: "law", label: "Law" },
  { value: "economics", label: "Economics" },
  { value: "psychology", label: "Psychology" },
  { value: "literature", label: "Literature" },
  { value: "geography", label: "Geography" },
];

export function MajorSelector({ value, onChange }: MajorSelectorProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Pilih jurusan" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {majors.map((major) => (
            <SelectItem key={major.value} value={major.value}>
              {major.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
} 