function getContrastRatio(rgb1, rgb2) {
    const luminance1 = getLuminance(rgb1)
    const luminance2 = getLuminance(rgb2)
    const brightest = Math.max(luminance1, luminance2)
    const darkest = Math.min(luminance1, luminance2)
    return (brightest + 0.05) / (darkest + 0.05)
}

function getLuminance(rgb) {
    const a = rgb.map(function (v) {
        v /= 255
        return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
    })
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722
}

function adjustLuminance(color, factor) {
    return color.map(function (v) {
        return Math.round(v * factor)
    })
}

export function generateTextColor(backgroundColor) {
    const targetContrastRatio = 4.5
    let textColor = [255, 255, 255] // Start with white
    let contrastRatio = getContrastRatio(backgroundColor, textColor)

    // Adjust text color luminance until sufficient contrast ratio is achieved
    let factor = 1.0
    const step = 0.05
    while (contrastRatio < targetContrastRatio) {
        factor -= step
        textColor = adjustLuminance(backgroundColor, factor)
        contrastRatio = getContrastRatio(backgroundColor, textColor)

        // Break if factor goes below a threshold
        if (factor < 0.1) {
            break
        }
    }

    return textColor
}

// Convert RGB array to hex string for display
export function rgbToHex(rgb) {
    return `#${((1 << 24) + (rgb[0] << 16) + (rgb[1] << 8) + rgb[2])
        .toString(16)
        .slice(1)
        .toUpperCase()}`
}