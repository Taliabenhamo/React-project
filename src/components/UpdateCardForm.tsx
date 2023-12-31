import { useEffect, useState } from "react";
import FormLayout from "../layouts/FormLayout";
import Title from "./Title";
import { editCard, getCardById } from "../services/ApiServices";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

function UpdateCardForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [description, setDescription] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [web, setWeb] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imageAlt, setImageAlt] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [houseNum, setHouseNum] = useState("");
  const [zip, setZip] = useState("");

  useEffect(() => {
    if (!id) return;

    getCardById(id).then((json) => {
      setTitle(json.title);
      setSubTitle(json.subTitle);
      setDescription(json.description);
      setPhone(json.phone);
      setEmail(json.email);
      setWeb(json.web);
      setImageUrl(json.imageUrl);
      setImageAlt(json.imageAlt);
      setState(json.state);
      setCountry(json.country);
      setCity(json.city);
      setStreet(json.street);
      setHouseNum(json.houseNum);
      setZip(json.zip);
    });
  }, [id]);
  function validate(): boolean {
    if (!title) {
      toast.error("Title is required.");
      return false;
    }

    if (!subTitle && subTitle.length < 3) {
      toast.error("subtitle is required and must contain more than 3 letters");
      return false;
    }
    if (!description && description.length < 3) {
      toast.error(
        "description is required and must contain more than 3 letters"
      );
      return false;
    }
    const phoneRegex = /^\d{10}$/;
    if (!phone || !phoneRegex.test(phone)) {
      toast.error("Phone is required and must be a valid 10-digit number.");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      toast.error("Email is required and must be valid.");
      return false;
    }

    if (!country) {
      toast.error("country is required.");

      return false;
    }
    if (!city) {
      toast.error("city is required.");
      return false;
    }
    if (!street) {
      toast.error("street is required.");
      return false;
    }
    if (!houseNum) {
      toast.error("house number is required.");
      return false;
    }

    return true;
  }

  const handleUpdateClick = async () => {
    if (!id) return;
    if (!validate()) {
      return;
    }
    const result = await editCard(id, {
      title,
      subTitle,
      description,
      phone,
      email,
      web,
      imageAlt,
      imageUrl,
      state,
      country,
      city,
      street,
      houseNum,
      zip,
    })
      .then((json) => {
        navigate("/adminarea");
        toast.success(` ${title} card has been successfully updated!`);
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  const handleRefresh = () => {
    setTitle("");
    setSubTitle("");
    setDescription("");
    setPhone("");
    setEmail("");
    setWeb("");
    setImageUrl("");
    setImageAlt("");
    setState("");
    setCountry("");
    setCity("");
    setStreet("");
    setHouseNum("");
    setZip("");
  };
  return (
    <>
      <Title mainText="UPDARE CARD" />

      <FormLayout>
        <form>
          <div className="m-4">
            <div className="d-flex m-4">
              <div className="form-floating left-input m-2 ">
                <input
                  type="text"
                  className="form-control "
                  id="floatingInput"
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <label htmlFor="floatingInput">Title: &#42;</label>
              </div>

              <div className="form-floating right-input m-2">
                <input
                  type="text"
                  className="form-control"
                  id="floatingInput"
                  placeholder="Subtitle"
                  value={subTitle}
                  onChange={(e) => setSubTitle(e.target.value)}
                />
                <label htmlFor="floatingInput">Subtitle: &#42;</label>
              </div>
            </div>

            <div className="d-flex  m-4">
              <div className="form-floating left-input m-2">
                <input
                  type="text"
                  className="form-control"
                  id="floatingInput"
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <label htmlFor="floatingInput">Description:&#42;</label>
              </div>

              <div className="form-floating right-input m-2">
                <input
                  type="text"
                  className="form-control"
                  id="floatingInput"
                  placeholder="Street"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <label htmlFor="floatingInput">Phone:&#42;</label>
              </div>
            </div>

            <div className="d-flex m-4 ">
              <div className="form-floating left-input m-2">
                <input
                  type="text"
                  className="form-control"
                  id="floatingInput"
                  placeholder="Image Url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                />
                <label htmlFor="floatingInput">Image Url:</label>
              </div>

              <div className="form-floating right-input m-2">
                <input
                  type="text"
                  className="form-control"
                  id="floatingInput"
                  placeholder="Image Alt"
                  value={imageAlt}
                  onChange={(e) => setImageAlt(e.target.value)}
                />
                <label htmlFor="floatingInput">Image Alt:</label>
              </div>
            </div>
            <div className="d-flex  m-4">
              <div className="form-floating left-input m-2">
                <input
                  type="text"
                  className="form-control"
                  id="floatingInput"
                  placeholder="State"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                />
                <label htmlFor="floatingInput">State: </label>
              </div>

              <div className="form-floating right-input m-2">
                <input
                  type="text"
                  className="form-control"
                  id="floatingInput"
                  placeholder="State"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                />
                <label htmlFor="floatingInput">Country:&#42;</label>
              </div>
            </div>
            <div className="d-flex m-4 ">
              <div className="form-floating left-input m-2">
                <input
                  type="text"
                  className="form-control"
                  id="floatingInput"
                  placeholder="Country"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
                <label htmlFor="floatingInput">City: &#42;</label>
              </div>

              <div className="form-floating right-input m-2">
                <input
                  type="text"
                  className="form-control"
                  id="floatingInput"
                  placeholder="Street"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                />
                <label htmlFor="floatingInput">Street:&#42;</label>
              </div>
            </div>
            <div className="d-flex  m-4">
              <div className="form-floating left-input m-2">
                <input
                  type="text"
                  className="form-control"
                  id="floatingInput"
                  placeholder="City"
                  value={houseNum}
                  onChange={(e) => setHouseNum(e.target.value)}
                />
                <label htmlFor="floatingInput">House Number: &#42;</label>
              </div>

              <div className="form-floating right-input m-2">
                <input
                  type="text"
                  className="form-control"
                  id="floatingInput"
                  placeholder="Street"
                  value={zip}
                  onChange={(e) => setZip(e.target.value)}
                />
                <label htmlFor="floatingInput">Zip:</label>
              </div>
            </div>
            <div className="d-flex  m-4">
              <div className="form-floating left-input m-2">
                <input
                  type="text"
                  className="form-control"
                  id="floatingInput"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="floatingInput">Email: &#42;</label>
              </div>

              <div className="form-floating right-input m-2">
                <input
                  type="text"
                  className="form-control"
                  id="floatingInput"
                  placeholder="Web"
                  value={web}
                  onChange={(e) => setWeb(e.target.value)}
                />
                <label htmlFor="floatingInput">Web:</label>
              </div>
            </div>
          </div>
        </form>
      </FormLayout>

      <div className="m-4 d-flex justify-content-center">
        <button
          className="me-2 col-2 btn btn-outline-danger"
          onClick={() => (window.location.href = "/adminarea")}
        >
          cancel
        </button>
        <button
          className="me-2 col-2 btn btn-outline-primary"
          onClick={handleRefresh}
        >
          {" "}
          <i className="bi bi-arrow-repeat"></i>
        </button>
      </div>
      <div className="d-flex justify-content-center ">
        <button className="col-4 btn btn-primary" onClick={handleUpdateClick}>
          submit
        </button>
      </div>
    </>
  );
}

export default UpdateCardForm;
