export default function SVG({xmlns, width, height, fillColor}: {xmlns: string, width: number, height:number, fillColor:string}){
    return (
        <svg xmlns={xmlns} width={width} height={height}>
            <path fill={fillColor} />
        </svg>
    )
}
