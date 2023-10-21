import { DynamicOption, stagger } from "framer-motion";

const createStagger = ({
  length,
  startDelay = 0,
  duration,
  previousDelay = 0,
}: {
  length: number;
  startDelay: number;
  duration: number;
  previousDelay: number;
}) => {
  const st = stagger(duration, { startDelay: previousDelay + startDelay });
  return {
    stagger: st,
    total: st(length, length),
  };
};
/**
 * TODO: typescript tuple로 지원.
 * 애니메이션을 차례로 쌓도록 합니다.
 * @param props
 * @returns
 */
export function useMultiStagger<
  T extends readonly { length: number; startDelay: number; duration: number }[]
>(props: T): DynamicOption<number>[] {
  const result = props.reduce((memo, curr, index) => {
    const currStagger = createStagger({
      length: curr.length,
      startDelay: curr.startDelay,
      duration: curr.duration,
      previousDelay: index > 1 ? memo[index - 1].total : 0,
    });
    memo.push(currStagger);
    return memo;
  }, [] as ReturnType<typeof createStagger>[]);
  return result.map((value) => value.stagger);
}
