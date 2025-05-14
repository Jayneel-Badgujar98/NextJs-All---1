export default function AboutLayout({ children }) {
    return (
      <div style={{ border: '2px solid green', padding: '10px' }}>
        <h2>About Layout Header</h2>
        {children}
      </div>
    );
  }
  