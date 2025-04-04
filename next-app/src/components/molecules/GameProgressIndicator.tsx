interface IGameProgressIndicatorProps {
  totalAmount: number;
  felledCount: number;
}

/**
 * The indicator of how many bosses are marked as felled in comparison to the total amount of bosses
 */
export function GameProgressIndicator(props: IGameProgressIndicatorProps) {
  return (
    <div className="fixed bottom-10 right-10 z-40 flex h-24 w-24 items-center justify-center rounded-full border border-black dark:border-white bg-white dark:bg-black">
      {props.felledCount} / {props.totalAmount}
    </div>
  );
}
