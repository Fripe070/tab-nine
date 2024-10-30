import React from "react";
import { defaultData, Props } from "./types";
import "./InfoDB.scss";

const InfoDBSettings: React.FC<Props> = ({ data = defaultData, setData }) => (
    <div className="InfoDBSettings">
        <form
            onSubmit={(event) => {
                event.preventDefault();
                const formData = new FormData(event.currentTarget);
                setData({
                    ...data,
                    items: [
                        ...data.items,
                        {
                            title: formData.get("title") as string,
                            description: formData.get("description") as string,
                            author: formData.get("author") as string,
                            link: formData.get("link") as string,
                        },
                    ],
                });
            }}
        >
            <input
                name="title"
                type="text"
                placeholder="Title"
                autoComplete="off"
                required
            />
            <textarea
                name="description"
                placeholder="Description"
                autoComplete="off"
                required
            />
            <input
                name="author"
                type="text"
                placeholder="Author (optional)"
                autoComplete="off"
            />
            <input
                name="link"
                type="url"
                placeholder="Link (optional)"
                autoComplete="off"
            />

            <button type="submit">Add</button>
        </form>

        <br />

        <div className="items">
            {data.items.map((item, index) => (
                <li key={index} className="item">
                    <span className="title">{item.title}</span>
                    <button
                        onClick={() =>
                            setData({
                                ...data,
                                items: data.items.filter((_, i) => i !== index),
                            })
                        }
                    >
                        Remove
                    </button>
                </li>
            ))}
        </div>
    </div>
);

export default InfoDBSettings;
