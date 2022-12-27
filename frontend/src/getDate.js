const getDate = (curr_date) => {
    const create_at = new Date(curr_date)
    const curr = new Date()
    const milli = Math.abs(curr - create_at)
    const secs = Math.floor(milli / 1000);
    const mins = Math.floor(secs / 60)
    const hrs = Math.floor(mins / 60)
    const days = Math.floor(hrs / 24)
    if (days > 0) return `${days} day${days > 1 ? 's' : ''}`
    if (hrs > 0) return `${hrs} hr${hrs > 1 ? 's' : ''}`
    if (mins > 0) return `${mins} min${mins > 1 ? 's' : ''}`
    return `${secs} sec${secs > 1 ? 's' : ''}`
}
export default getDate;