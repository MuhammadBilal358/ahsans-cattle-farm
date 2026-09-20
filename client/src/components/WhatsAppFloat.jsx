export default function WhatsAppFloat() {
  return (
    <a
      href="https://wa.me/923073777444"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      style={{
        position: 'fixed',
        bottom: 22,
        right: 22,
        zIndex: 200,
        width: 58,
        height: 58,
        borderRadius: '50%',
        background: '#25D366',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 10px 24px rgba(0,0,0,.3)',
        fontSize: 28
      }}
    >
      💬
    </a>
  );
}
