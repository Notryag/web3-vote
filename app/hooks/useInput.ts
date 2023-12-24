import React, { useState } from "react";

export default function(initialValue: string = "") {
    const [value, setVlue] = useState(initialValue)
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setVlue(e.target.value)
    }
    return [value, onchange]
}