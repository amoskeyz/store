import { useState, useEffect, useRef } from 'react';
// import { WithContext as ReactTags } from 'react-tag-input';
import ReactTags from 'react-tag-autocomplete';
import { axiosInstance } from 'helpers';

const AddTags = ({ tags, setTags }) => {
  const [suggestions, setSuggestions] = useState();
  const reactTags = useRef();

  useEffect(() => {
    const getTags = async () => {
      try {
        const allTags = await axiosInstance.get('/tags');

        setSuggestions(allTags.data.data);
      } catch (err) {}
    };

    getTags();
  }, []);

  const onDelete = (i) => {
    setTags((p_tags) => p_tags.filter((tag, index) => index !== i));
  };

  const onAddition = (tag) => {
    setTags([...tags, { id: Math.ceil(Math.random() * 2000), ...tag }]);
  };

  return (
    <div className="mt-10">
      <h3 className="text-xl mb-3">Add Tags</h3>

      <div>
        <ReactTags
          ref={reactTags}
          tags={tags}
          suggestions={suggestions}
          onDelete={onDelete}
          onAddition={onAddition}
          allowNew
          allowBackspace
        />
      </div>
    </div>
  );
};

export default AddTags;
