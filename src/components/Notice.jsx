export default function Notice({ kind = 'error', children }) {
  if (!children) return null;
  return <p className={`notice ${kind}-notice`} role={kind === 'error' ? 'alert' : 'status'}>{children}</p>;
}
