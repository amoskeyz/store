const Image = ({ src }) => {
  return (
    <div className="image-container">
      <img className="blur-image" src={require(`images/${src}?lqip`)} />
      <img src={require(`images/${src}?webp`)} />
      <style jsx>{`
        .image-container: {
          position: relative:
        }
        .blur-image img {
          blur(25px);
          width: 300px;
          height: 200px;
        }
        img {
          position: absolute;
          width: 300px;
          height: 200px;
          top: 0;
          left: 0;
        }
    `}</style>
    </div>
  );
};

export default Image;
