import {FC, useCallback, useEffect, useState} from "react";

interface CountDownProps {
  time: number
  onEnd: () => void
}

const CountDown: FC<CountDownProps> = ({ time, onEnd }) => {
  const [seconds, setSeconds] = useState(0)

  const start = useCallback((lave: number) => {
    if (lave <= 0) {
      onEnd()
      return
    }
    setTimeout(() => {
      setSeconds(lave - 1)
      start(lave - 1)
    }, 1000)
  }, [onEnd])

  useEffect(() => {
    start(time)
  }, [start, time])

  return (
    <span>{seconds || time}s</span>
  )
}

export default CountDown