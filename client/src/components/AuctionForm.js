import React from "react";
import { FormErrors } from "./FormErrors";

function AuctionForm(props) {
  const { errors = [], onSubmit = () => {} } = props;

  const handleSubmit = event => {
    event.preventDefault();

    const formData =  new FormData(event.currentTarget);
    onSubmit({
      title: formData.get("title"),
      description: formData.get("description"),
      price: formData.get("price")
    });
  }

  return (
    <form
      className="AuctionForm"
      onSubmit={handleSubmit}
    >
      <div>
        <label htmlFor="title">Title</label> <br />
        <input name="title" id="title" />
        <FormErrors forField="title" errors={errors} />
      </div>

      <div>
        <label htmlFor="description">description</label> <br />
        <textarea name="description" id="description" cols="60" rows="4" />
      </div>

      <div>
        <label htmlFor="price">Price</label> <br />
        <input name="price" id="price" />
        <FormErrors forField="price" errors={errors} />
      </div>

      <div>
        <input type="submit" value="Save"/>
      </div>
    </form>
  )
}

export { AuctionForm };
