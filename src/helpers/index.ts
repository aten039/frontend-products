export function formatCurrency( num: number){
    
    return new Intl.NumberFormat('es-US', {
        style: 'currency',
        currency:'USD'
    }).format(num)
}

export function toBoolean( str: string){
    return str.toLowerCase() === 'true'? true: false
}