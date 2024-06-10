// anim easing curve

const smooth = [0.4, 0, 0, 1]
const flow = [0.4, 0, 0.2, 1]
const bouncy = [0.86, 0, 0.07, 1]

// const bouncySpring = { type: "spring", mass: 0.58, damping: 0.8, velocity: 0 }

export { smooth, flow, bouncy };

const standard = {
    damping: 20, mass: 1, stiffness: 170
}
const gentle = {
    damping: 15, mass: 2, stiffness: 100
}
const quick = {
    damping: 25, mass: 0.5, stiffness: 300
}
const springyPop = {
    damping: 20, mass: 0.5, stiffness: 500
}
const molasses = {
    damping: 26, mass: 0.3, stiffness: 80
}
const softBounce = {
    damping: 15, mass: 1, stiffness: 120
}
const lazyDrift = {
    damping: 30, mass: 1, stiffness: 50
}
const gentleEase = {
    damping: 20, mass: 1.5, stiffness: 90
}
const criticalDamping = {
    damping: 20, mass: 1, stiffness: 200
}
const rubberBandSnap = {
    damping: 10, mass: 0.5, stiffness: 600
}
const precisionStop = {
    damping: 25, mass: 1, stiffness: 150
}

export {
    standard,
    gentle,
    quick,
    springyPop,
    molasses,
    softBounce,
    lazyDrift,
    gentleEase,
    criticalDamping,
    rubberBandSnap,
    precisionStop
}