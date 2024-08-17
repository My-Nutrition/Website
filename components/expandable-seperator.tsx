import React from "react"
import { Separator } from "./ui/separator"
import { Label } from "./ui/label"
import { ChevronDown, Check } from "lucide-react"
import { Button } from "./ui/button"

interface ExpandableSeperatorProps {
    label: string
    expanded: boolean
    setExpanded: React.Dispatch<React.SetStateAction<boolean>>
    showCheck: boolean
}

const ExpandableSeperator: React.FC<ExpandableSeperatorProps> = ({
    label,
    expanded,
    setExpanded,
    showCheck,
}) => {
    return (
        <div className="flex flex-row justify-center items-center space-x-4 w-full">
            <Separator className="w-1/2" />
            <Button
                className="cursor-pointer h-8 space-x-2"
                onClick={() => setExpanded(!expanded)}
                variant="ghost"
            >
                <Label className="cursor-pointer">{label}</Label>
                {(showCheck && (
                    <Check className="w-4 h-4 text-foreground" />
                )) || (
                    <ChevronDown
                        className={`w-4 h-4 text-foreground transition-transform duration-200 ${
                            expanded ? "rotate-180" : "rotate-0"
                        }`}
                    />
                )}
            </Button>
            <Separator className="w-1/2" />
        </div>
    )
}

export default ExpandableSeperator
