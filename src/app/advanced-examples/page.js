
import React from 'react'

import styles from './advancedexamples.module.scss'
import IpadPointer from './components/ipadPointer/IpadPointer'
import { CustomCursor } from './components/CustomCursor/CustomCursor'
import { VelocityCursor } from './components/VelocityCursor/VelocityCursor'
import { CursorTrail } from './components/CursorTrail/CursorTrail'
import { CustomCursorDirectionalBokeh } from './components/CustomCursorDirectionalBokeh/CustomCursorDirectionalBokeh'
import { CursorBackgroundPointer } from './components/CursorBackgroundPointer/CursorBackgroundPointer'
import CursorConfetti from './components/CursorConfetti/CursorConfetti'
import SVGCursorCurve from './components/SVGCursorCurve/SVGCursorCurve'
import CarouselCardStack from './components/CarouselCardStack/CarouselCardStack'

import ShuffleFlipCard from '../advanced-examples/components/ShuffleFlipCard/ShuffleFlipCard'

import CynlinderCarousel from './components/CynlinderCarousel/CynlinderCarousel'
import VerticalCardStack from './components/VerticalCardStack/VerticalCardStack'
import DiagonalCardStack from './components/DiagonalCardStack/DiagonalCardStack'
import GridCardStack from './components/GridCardStack/GridCardStack'

import LineNavigation from './components/LineNavigation/LineNavigation'
import CardHoverAccordian from './components/CardHoverAccordian/CardHoverAccordian'
import { CardStack2 } from './components/CardStack2/CardStack2'

import MapFold from './components/MapFold/MapFold'
import CardWheel from './components/CardWheel/CardWheel'
import CursorTrail3 from './components/CursorTrail3/CursorTrail3'
import CursorTrail2 from './components/CursorTrail2/CursorTrail2'

import MovingDigits from './components/MovingDigits/MovingDigits'
import AppStoreCard from './components/AppStoreCard/AppStoreCard'
import BottomNav from './components/BottomNav/BottomNav'
import Link from 'next/link'

const Advancedexamples = () => {
    return (
        <div className={styles.contentWrap}>
            <div className={styles.layoutWrap}>
                <div className={styles.layout}>
                    <h1>Advanced Examples</h1>
                    {/* ---- */}
                    {/* unused or not ready */}
                    {/* <section>
                        <h3>Custom Cursor</h3>
                        <p>Cursor controled perspective and enter effect</p>
                        <CustomCursor />
                    </section> */}

                    {/* ---- */}

                    {/* <section>
                        <h3>Cursor Trail</h3>
                        <CursorTrail />
                    </section> */}

                    {/* it is ready, but is not related to framer motion. so no display
                    <CursorTrail2 /> */}


                    <section>
                        <h3>iPad Pointer Effect</h3>
                        <p>When you hover on any icons, it feels the icon pull the cursor in when it is near. This magnetic feel animations is explained by Apple designers at WWDC20.</p>
                        <IpadPointer />
                    </section>


                    <section>
                        <h3>Velocity Cursor</h3>
                        <p>You can access the velocity of a motion value and use it to skew shapes</p>
                        <VelocityCursor />
                    </section>


                    <section>
                        <h3>Cursor Directional Bokeh</h3>
                        <p>Move the cursor around, and the image will rotate. The blur effect will also go along the rotation.</p>
                        <CustomCursorDirectionalBokeh />
                    </section>

                    <section>
                        <h3>Background Reveal</h3>
                        <p>Background will reveal its details when you move cursor over and hide it when you stop moving</p>
                        <CursorBackgroundPointer />
                    </section>

                    <section>
                        <h3>CursorTrail 3</h3>
                        <p>Move mouse around to see the image trails. If you move fast, image trail size will repond to it. </p>
                        <CursorTrail3 />
                    </section>


                    <section>
                        <h3>Cursor Confetti</h3>
                        <p>wip</p>
                        <CursorConfetti />
                    </section>


                    <section>
                        <h3>SVG Curve</h3>
                        <p>SVG curve changes responding to the cursor</p>
                        <SVGCursorCurve />
                    </section>

                    <section>
                        <h3>Carousel Card Stack</h3>
                        <p>Drag card to select and tap to show more, WIP</p>
                        <CarouselCardStack />
                    </section>


                    <section>
                        <h3>Carousel Card Stack 2</h3>
                        <p>Now you can tap on any card, but no detail view</p>
                        <CardStack2 />
                    </section>




                    <section>
                        <h3>Shuffle Flip Card</h3>
                        <p>Drag and click the card</p>
                        <ShuffleFlipCard />
                    </section>


                    <section>
                        <h3>Cylinder Carousel</h3>
                        <p>Cards on 3d</p>
                        <CynlinderCarousel />
                    </section>

                    <section>
                        <h3>Vertical Card Stack</h3>
                        <p>WIP</p>
                        <VerticalCardStack />
                    </section>

                    <section>
                        <h3>Diagonal Card Stack</h3>
                        <p>Inspired by Apple 100 best albums</p>
                        <DiagonalCardStack />
                    </section>

                    <section>
                        <h3>Grid Card Stack</h3>
                        <p>Add some flavors to layoutId</p>
                        <GridCardStack />
                    </section>

                    <section>
                        <h3>Line Navigation</h3>
                        <p>Inspired by stripe press</p>
                        <LineNavigation />
                    </section>

                    <section>
                        <h3>Card Hover Accordion</h3>
                        <CardHoverAccordian />
                    </section>

                    <section>
                        <h3>Map Fold</h3>
                        <p>drag down the map and reveal full map</p>
                        <MapFold />
                    </section>

                    <section>
                        <h3>Wheel Selection</h3>
                        <CardWheel />
                    </section>

                    <section>
                        <h3>Moving Digits</h3>
                        <MovingDigits />
                    </section>

                    <section>
                        <h3>App store card layout</h3>
                        <AppStoreCard />
                    </section>

                    <section>
                        <h3>Bottom Nav</h3>
                        <p>Smooth card animation inspired from
                            <Link href={'https://x.com/60fpsdesign/status/1807304714561921061'}> here
                            </Link></p>
                        <BottomNav />
                    </section>

                </div>
            </div>
        </div>
    )
}

export default Advancedexamples

