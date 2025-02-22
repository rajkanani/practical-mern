import React, { useEffect, useState } from "react";
import { WithContext as ReactTags } from "react-tag-input";

function InputTag({ tagsProps, tagsLengthProps, onTagChange }) {
    const [tags, setTags] = useState([]);
    const [tagsLength, setTagsLength] = useState(tagsLengthProps);
    const [readOnly, setReadOnly] = useState(false);

    useEffect(() => {
        setTags(
            tagsProps.map((e) => ({ id: e + "", text: e + "", className: "" }))
        );
    }, [tagsProps]);

    const handleAddition = (tag) => {
        let tagList = [...tags, tag];
        setTags(tagList);
        if (tagList.length >= tagsLength) setReadOnly(true);
        onTagChange(tagList.map((e) => e.text));
    };

    const handleDelete = (i) => {
        let tagList = tags.filter((tag, index) => index !== i);
        setTags(tagList);
        if (tagList.length < tagsLength) setReadOnly(false);
        onTagChange(tagList.map((e) => e.text));
    };

    const clearAll = () => {
        setTags([]);
        onTagChange([]);
    };

    return (
        <>
            <ReactTags
                inputProps={{ disabled: readOnly }}
                classNames={{
                    selected: "list-of-anchor",
                    tag: "list-anchor",
                    tagInputField:
                        "mt-1 p-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500",
                    remove: "ReactTags__remove list-anchor-remove",
                    clearAll: "list-anchor-clear",
                }}
                name="variants"
                tags={tags}
                handleDelete={handleDelete}
                handleAddition={handleAddition}
                placeholder="List of Variants"
                maxTags={tagsLength}
                inline={true}
                allowDragDrop={false}
                clearAll={true}
                onClearAll={clearAll}
            />
        </>
    );
}

export default InputTag;
