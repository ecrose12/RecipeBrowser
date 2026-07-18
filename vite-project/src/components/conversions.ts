export function formatVolume(tbsp: number): string {
    const cups = tbsp / 16
    if (cups >= 1) {
        const wholeCups = Math.floor(cups)
        const remainingTbsp = Math.round((cups - wholeCups) * 16)
        if (remainingTbsp === 0) return wholeCups === 1 ? `1 cup` : `${wholeCups} cups`
        if (remainingTbsp >= 8) return `${wholeCups > 0 ? wholeCups + " " : ""}${Math.round(remainingTbsp / 16 * 4)}/4 cup`.trim()
        if (remainingTbsp >= 4) return `${wholeCups > 0 ? wholeCups + " cup " : ""}1/4 cup`.trim()
        if (remainingTbsp >= 2) return `${wholeCups > 0 ? wholeCups + " cup " : ""}2 tbsp`.trim()
        return `${wholeCups > 0 ? wholeCups + " cup " : ""}1 tbsp`.trim()
    }
    if (tbsp >= 4) return `1/4 cup`
    if (tbsp >= 3) return `3 tbsp`
    if (tbsp >= 2) return `2 tbsp`
    if (tbsp >= 1) return `1 tbsp`
    const tsp = Math.round(tbsp * 3 * 10) / 10
    return `${tsp} tsp`
}

export function convertToUS(text: string): string {
    let result = text

    // Weight conversions - kg to lbs and oz
    result = result.replace(/(\d+(?:\.\d+)?)\s*kg/gi, (_, n) => {
        const totalLbs = parseFloat(n) * 2.205
        const lbs = Math.floor(totalLbs)
        const oz = Math.round((totalLbs - lbs) * 16 * 10) / 10
        if (lbs === 0) return `${oz} oz`
        if (oz === 0) return `${lbs} lb`
        return `${lbs} lb ${oz} oz`
    })

    // Weight conversions - grams to lbs and oz
    result = result.replace(/(\d+(?:\.\d+)?)\s*g\b/gi, (_, n) => {
        const totalOz = parseFloat(n) / 28.3495
        if (totalOz < 16) {
            return `${Math.round(totalOz * 10) / 10} oz`
        }
        const lbs = Math.floor(totalOz / 16)
        const oz = Math.round((totalOz % 16) * 10) / 10
        if (oz === 0) return `${lbs} lb`
        return `${lbs} lb ${oz} oz`
    })

    // Volume conversions - ml to cups/tbsp/tsp
    result = result.replace(/(\d+(?:\.\d+)?)\s*ml\b/gi, (_, n) => {
        const tbsp = parseFloat(n) / 14.787
        return formatVolume(tbsp)
    })

    // Volume conversions - liters to cups
    result = result.replace(/(\d+(?:\.\d+)?)\s*liters?/gi, (_, n) => {
        const tbsp = parseFloat(n) * 67.628
        return formatVolume(tbsp)
    })
    result = result.replace(/(\d+(?:\.\d+)?)\s*litres?/gi, (_, n) => {
        const tbsp = parseFloat(n) * 67.628
        return formatVolume(tbsp)
    })

    // Convert large tbsp amounts to cups
    result = result.replace(/(\d+(?:\.\d+)?)\s*tbsp\b/gi, (_, n) => {
        const tbsp = parseFloat(n)
        if (tbsp < 4) return `${n} tbsp`
        return formatVolume(tbsp)
    })
    result = result.replace(/(\d+(?:\.\d+)?)\s*tablespoons?\b/gi, (_, n) => {
        const tbsp = parseFloat(n)
        if (tbsp < 4) return `${n} tbsp`
        return formatVolume(tbsp)
    })

    // Temperature conversions
    result = result.replace(/(\d+(?:\.\d+)?)\s*°?\s*C\b/gi, (_, n) => {
        const f = Math.round((parseFloat(n) * 9) / 5 + 32)
        return `${f}°F`
    })
    result = result.replace(/(\d+(?:\.\d+)?)\s*degrees?\s*[Cc]elsius/gi, (_, n) => {
        const f = Math.round((parseFloat(n) * 9) / 5 + 32)
        return `${f}°F`
    })
    result = result.replace(/(\d+(?:\.\d+)?)\s*degrees?\s*[Cc]\b/gi, (_, n) => {
        const f = Math.round((parseFloat(n) * 9) / 5 + 32)
        return `${f}°F`
    })

    return result
}
