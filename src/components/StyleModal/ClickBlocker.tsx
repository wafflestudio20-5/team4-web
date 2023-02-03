export default function ClickBlocker() {
  return (
    <div
      style={{
        position: 'fixed',
        width: '100%',
        height: '100%',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        background: 'transparent',
      }}
    />
  );
}
