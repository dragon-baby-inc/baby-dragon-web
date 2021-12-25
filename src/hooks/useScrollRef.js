import { useCallback, useState, useRef, useEffect } from "react"

const useScrollRef = () => {
  const ref = useRef()
  let prev;
  /* eslint-disable no-unused-vars */
  const [prevScrollInfo, setPrevScrollInfo] = useState({ x: { value: 0 }, y: { value: 0 } })
  const [scrollInfo, setScrollInfo] = useState({ x: { value: 0 }, y: { value: 0 } })
  const [dir, setdir] = useState({ x: null, y: null })
  let x, y;

  const handleScroll = useCallback((e, set) => {
    if (prev) {
//       console.log('-')
//       console.log('prev:' + prev.y.value)
//       console.log('new:' + e.target.scrollTop)
      if (prev.y.value === e.target.scrollTop) {
        y = y
      } else {
        y = prev.y.value > e.target.scrollTop ? 1 : 0
      }

      if (prev.x.value === e.target.scrollLeft) {
        x = x
      } else {
        x = prev.x.value > e.target.scrollLeft ? 1 : 0
      }

      setdir({ x: x, y: y })
    }

    let info = { x: { value: e.target.scrollLeft }, y: { value: e.target.scrollTop } }
    if (prev && info.x.value === prev.x.value && info.y.value === prev.y.value) {
      return
    }
    set(info)
    prev = info
  }, []);

  useEffect(() => {
    const div = ref.current
    if (div) {
      div.addEventListener('scroll', (e) => handleScroll(e, setScrollInfo));
    }
  }, [ref.current]);

  return [scrollInfo, dir, ref];
}

export default useScrollRef;
