
import CodeSnippet from "@/components/CodeSnippet";
import BasicAnimation from "@/components/mdxExamples/themainproperties/animate/basic";
import AnimateExamples from '@/components/mdxExamples/themainproperties/animate/animateExamples'
import ComplexProps from "@/components/mdxExamples/themainproperties/animate/complexProps"
import Sandbox from "@/components/mdxExamples/themainproperties/animate/sandbox";
import State01 from "@/components/mdxExamples/themainproperties/animate/stateExample/state01/";
import State02 from "@/components/mdxExamples/themainproperties/animate/stateExample/state02";
import ConditionalAnim from "@/components/mdxExamples/themainproperties/animate/animateWithCondition/";
import DelayExample from '@/components/mdxExamples/themainproperties/transition/delay/index'
import DelayMix from "@/components/mdxExamples/themainproperties/transition/delayMix/index";
import SpringExample from "@/components/mdxExamples/themainproperties/transition/spring/index";
import TweenExample from "@/components/mdxExamples/themainproperties/transition/tween/index";
import InertiaPower from "@/components/mdxExamples/themainproperties/transition/inertia/inertiaPower/index";
import RepeatMix from "@/components/mdxExamples/themainproperties/transition/repeatMix/index";
import TransitionPerProp from "@/components/mdxExamples/themainproperties/transition/transitionPerProp/index";
import TransitionReset from "@/components/mdxExamples/themainproperties/transition/transitionReset";
import Initial from "@/components/mdxExamples/themainproperties/initial";

const mdxMapper = {
    pre: CodeSnippet,
    // animation mdx components
    BasicAnimation,
    AnimateExamples,
    ComplexProps,
    Sandbox,
    State01,
    State02,
    ConditionalAnim,
    // transition mdx components
    DelayExample,
    DelayMix,
    SpringExample,
    TweenExample,
    InertiaPower,
    RepeatMix,
    TransitionPerProp,
    TransitionReset,
    // initial
    Initial,

}

export default mdxMapper