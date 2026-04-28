"use client"

import { useState } from "react"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger, SheetFooter } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Filter, X, RotateCcw } from "lucide-react"

export interface FilterOption {
  value: string
  label: string
}

export interface FilterGroup {
  id: string
  label: string
  type: "select" | "multiselect" | "checkbox-group"
  options: FilterOption[]
  value: string | string[]
  onChange: (value: string | string[]) => void
}

interface FilterSheetProps {
  filters: FilterGroup[]
  onReset: () => void
  activeFilterCount?: number
}

export function FilterSheet({ filters, onReset, activeFilterCount = 0 }: FilterSheetProps) {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="lg:hidden relative">
          <Filter className="h-4 w-4 mr-2" />
          篩選
          {activeFilterCount > 0 && (
            <Badge 
              variant="default" 
              className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs"
            >
              {activeFilterCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="h-[85vh] rounded-t-xl">
        <SheetHeader className="text-left">
          <SheetTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              篩選條件
            </span>
            <Button variant="ghost" size="sm" onClick={onReset}>
              <RotateCcw className="h-4 w-4 mr-1" />
              重設
            </Button>
          </SheetTitle>
          <SheetDescription>
            選擇篩選條件以縮窄搜尋範圍
          </SheetDescription>
        </SheetHeader>
        
        <ScrollArea className="h-[calc(85vh-180px)] mt-4">
          <div className="space-y-6 pr-4">
            {filters.map((filter) => (
              <div key={filter.id} className="space-y-3">
                <Label className="text-sm font-medium">{filter.label}</Label>
                
                {filter.type === "select" && (
                  <Select 
                    value={filter.value as string} 
                    onValueChange={(v) => filter.onChange(v)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={`選擇${filter.label}`} />
                    </SelectTrigger>
                    <SelectContent>
                      {filter.options.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}

                {filter.type === "checkbox-group" && (
                  <div className="grid grid-cols-2 gap-2">
                    {filter.options.map((option) => {
                      const values = filter.value as string[]
                      const isChecked = values.includes(option.value)
                      return (
                        <label
                          key={option.value}
                          className="flex items-center gap-2 p-2 rounded-md border cursor-pointer hover:bg-muted/50 transition-colors"
                        >
                          <Checkbox
                            checked={isChecked}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                filter.onChange([...values, option.value])
                              } else {
                                filter.onChange(values.filter(v => v !== option.value))
                              }
                            }}
                          />
                          <span className="text-sm">{option.label}</span>
                        </label>
                      )
                    })}
                  </div>
                )}

                {filter.type === "multiselect" && (
                  <div className="flex flex-wrap gap-2">
                    {filter.options.map((option) => {
                      const values = filter.value as string[]
                      const isSelected = values.includes(option.value)
                      return (
                        <Badge
                          key={option.value}
                          variant={isSelected ? "default" : "outline"}
                          className="cursor-pointer"
                          onClick={() => {
                            if (isSelected) {
                              filter.onChange(values.filter(v => v !== option.value))
                            } else {
                              filter.onChange([...values, option.value])
                            }
                          }}
                        >
                          {option.label}
                          {isSelected && <X className="h-3 w-3 ml-1" />}
                        </Badge>
                      )
                    })}
                  </div>
                )}

                <Separator />
              </div>
            ))}
          </div>
        </ScrollArea>

        <SheetFooter className="mt-4">
          <Button className="w-full" onClick={() => setOpen(false)}>
            套用篩選（{activeFilterCount} 個條件）
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
