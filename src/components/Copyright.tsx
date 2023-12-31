

const Copyright = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="copyright-container">
      <p>&copy; {currentYear} Business Cards Ltd. All rights reserved</p>
    </div>
  );
};

export default Copyright;