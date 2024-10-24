"use client"
const IconRenderer: any = (name: { name: string }) => {
    let svgString;
    switch (name.name) {
        case "table-sorting-desc":
            svgString = (
                <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M5.22586 3.35999L3.36584 1.5L1.50586 3.35999"
                        stroke="#E3E3E8"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M3.36523 10.5V1.5"
                        stroke="#E3E3E8"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M6.77539 8.64062L8.63541 10.5006L10.4954 8.64062"
                        stroke="#E9F74D"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M8.63672 1.5V10.5"
                        stroke="#E9F74D"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>

            )
            break;
        case "table-sorting-asc":
            svgString = (
                <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M5.22586 3.35999L3.36584 1.5L1.50586 3.35999"
                        stroke="#E9F74D"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M3.36523 10.5V1.5"
                        stroke="#E9F74D"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M6.77539 8.64062L8.63541 10.5006L10.4954 8.64062"
                        stroke="#E3E3E8"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M8.63672 1.5V10.5"
                        stroke="#E3E3E8"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            )
            break;
        case "table-sorting":
            svgString = (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                >
                    <path
                        d="M5.22488 3.35999L3.36487 1.5L1.50488 3.35999"
                        stroke="#E3E3E8"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M3.36523 10.5V1.5"
                        stroke="#E3E3E8"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M6.77441 8.64001L8.63443 10.5L10.4944 8.64001"
                        stroke="#E3E3E8"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M8.63477 1.5V10.5"
                        stroke="#E3E3E8"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            );
            break;
        default:
            svgString = "";
            break;
    }
    return svgString;
}

export default IconRenderer
