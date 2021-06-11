import { useEffect, useState } from 'react';
import { axiosInstance } from 'helpers';
import { useToasts } from 'react-toast-notifications';
import imageCompression from 'browser-image-compression';
import loader from 'images/loader.gif';
import Plus from 'assets/icons/plus';
import Close from 'assets/icons/close';
import { isVideo, isImage } from 'helpers';

const ChooseImages = ({ images, setImages, productId }) => {
  const { addToast } = useToasts();

  const image_handler = (e) => {
    if (images.length > 4) {
      addToast('Maximum Images upload exceeded', {
        appearance: 'warning',
        autoDismiss: true,
      });
      return;
    }
    setImages([
      ...images,
      {
        file: e.target.files,
        img_id: Math.round(Math.random() * 898989),
        url: '',
      },
    ]);
  };

  return (
    <div className="my-10">
      <h3 className="text-xl mb-3">Add Images</h3>
      <ul className="flex flex-wrap -m-3.5 mb-5">
        {images?.map((img) => (
          <ImageUploader
            img={img}
            setImages={setImages}
            key={`product_images_${img.img_id}`}
            productId={productId}
          />
        ))}

        <label
          htmlFor="img-uploader"
          className="shadow bg-txt-lt w-40 h-40 m-3.5 flex-center cursor-pointer"
        >
          <input
            type="file"
            onChange={image_handler}
            id="img-uploader"
            className="hidden"
            accept=".jpg,.gif,.bmp,.png,.m4v,.avi,.mpg,.mp4"
          />

          <div className="p-5">
            <Plus className="fill-current text-txt-t w-20 h-20" />
            <p className="text-sm text-center mt-2">Add image</p>
          </div>
        </label>
      </ul>
    </div>
  );
};

function ImageUploader({ img, setImages, productId }) {
  const [loading, setLoading] = useState(!img.img_id);
  const { addToast } = useToasts();

  const upload = async (data, type) => {
    const formData = new FormData();
    formData.append('data', data);
    formData.append('title', img.file[0].name);
    formData.append('productId', productId);
    formData.append('mime', type);

    try {
      setLoading(true);
      const uploaded = await axiosInstance.post('/upload', formData);

      setImages((images) =>
        images.map((imgs) => {
          if (imgs.img_id === img.img_id) {
            return {
              ...imgs,
              file: URL.createObjectURL(img.file[0]),
              id: Math.ceil(Math.random() * 909090878),
              link: uploaded.data.url,
            };
          }
          return imgs;
        })
      );

      setLoading(false);
    } catch (err) {
      addToast(`Error uploading image`, {
        appearance: 'error',
        autoDismiss: true,
      });

      setImages((images) =>
        images.filter((imgs) => img.img_id !== imgs.img_id)
      );

      document.querySelector('#img-uploader').src = null;
    }
  };

  const image_handler = async () => {
    if (!img.file) return;

    if (isVideo(img.file[0].name)) {
      await upload(img.file[0], img.file[0].type);
      return;
    }

    if (isImage(img.file[0].name)) {
      const options = {
        maxSizeMB: 2, // (default: Number.POSITIVE_INFINITY)
      };

      imageCompression(img.file[0], options)
        .then(async function(compressedFile) {
          await upload(compressedFile, img.file[0].type);
        })
        .catch(function(error) {
          console.log(error.message);
        });
    }
  };

  useEffect(() => {
    if (img.link) return;

    image_handler();
  }, []);

  const deleteImage = async () => {
    setLoading(true);

    try {
      await axiosInstance.delete(
        `/upload?productId=${productId}&link=${img.link}`
      );

      setLoading(false);
      setImages((images) =>
        images.filter((imgs) => img.img_id !== imgs.img_id)
      );
    } catch (err) {
      addToast(`Error Deleting image`, {
        appearance: 'error',
        autoDismiss: true,
      });
    }
  };

  return (
    <li className="shadow bg-txt-lt w-40 h-40 m-3.5 flex-center options-form--con relative">
      <button
        className="close bg-txt w-8 h-8 absolute -top-2.5 -right-2.5 flex-center rounded-full invisible transition-all duration-300 opacity-0"
        onClick={deleteImage}
      >
        <Close className="w-5 h-5 fill-current text-white" />
      </button>
      {!loading ? (
        <img
          src={`https://ik.imagekit.io/gk81krdud/${img.link}?tr=w-600,h-800`}
          alt="product"
          className="w-full h-full object-contain"
        />
      ) : (
        <img src={loader} alt="loader" />
      )}
    </li>
  );
}

export default ChooseImages;
