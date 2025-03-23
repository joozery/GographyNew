import { Tag, Input } from "antd";
import { useState } from "react";

const EditableTagGroup = ({ value = "", onChange, className }) => {
  const [tags, setTags] = useState(value ? value.split(",,") : []);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingValue, setEditingValue] = useState("");
  const [inputVisible, setInputVisible] = useState(false);
  const [newTag, setNewTag] = useState("");

  const handleClose = (removedTag) => {
    const newTags = tags.filter((tag) => tag !== removedTag);
    setTags(newTags);
    onChange?.(newTags.join(",,"));
  };

  const showInput = () => setInputVisible(true);

  const handleInputConfirm = () => {
    if (newTag && !tags.includes(newTag)) {
      const newTags = [...tags, newTag];
      setTags(newTags);
      onChange?.(newTags.join(",,"));
    }
    setNewTag("");
    setInputVisible(false);
  };

  const handleEditConfirm = () => {
    const newTags = [...tags];
    newTags[editingIndex] = editingValue;
    setTags(newTags);
    setEditingIndex(null);
    setEditingValue("");
    onChange?.(newTags.join(",,"));
  };

  return (
    <div className={`${className}`}>
      <div className="flex gap-2 flex-wrap">
        {tags.map((tag, index) =>
          editingIndex === index ? (
            <Input
              key={index}
              size="small"
              className="w-32"
              value={editingValue}
              onChange={(e) => setEditingValue(e.target.value)}
              onBlur={handleEditConfirm}
              onPressEnter={handleEditConfirm}
              autoFocus
            />
          ) : (
            <Tag
              key={tag}
              closable
              onClose={() => handleClose(tag)}
              onDoubleClick={() => {
                setEditingIndex(index);
                setEditingValue(tag);
              }}
              className="cursor-pointer"
            >
              {tag}
            </Tag>
          )
        )}

        {inputVisible ? (
          <Input
            size="small"
            className="w-full"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            onBlur={handleInputConfirm}
            onPressEnter={handleInputConfirm}
            autoFocus
          />
        ) : (
          <Tag
            onClick={showInput}
            className="bg-gray-200 cursor-pointer hover:bg-gray-300"
          >
            + เพิ่ม
          </Tag>
        )}
      </div>
    </div>
  );
};

export default EditableTagGroup;
