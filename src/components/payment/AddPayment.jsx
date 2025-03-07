import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useEnv } from "../../context/env.context";

const AddPayment = ({ rentals }) => {
  const { getAccessTokenSilently } = useAuth0();
  const { apiServerUrl } = useEnv();
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    note: "",
    rentalId: rentals[0].rentalId,
    amount: rentals[0].price,
  });

  // addNewPaymentByRentalId
  const makePayment = async () => {
    const today = new Date();
    const body = {
      amount: formData.amount,
      date: 
        today.getFullYear() +
        "-" +
        today.getMonth().toString().length < 2 ?
         `0`+today.getMonth() + 1 : 
        (today.getMonth() + 1) +
        "-" +
        today.getDate().toString().length < 2 ? 
        "0" + today.getDate() :
        today.getDate(),
      time:
        today.getHours() + ":" + today.getMinutes(),
      note: formData.note,
    };
    const token = await getAccessTokenSilently();
    await axios.post(
      `${apiServerUrl}/api/v1/payments/byRental/${formData.rentalId}`,
      body,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    setFormData({
      note: "",
      rentalId: rentals[0].rentalId,
      amount: rentals[0].price,
    });
    setShow(false);
  };
  console.log(rentals)
  return (
    <>
      <Button variant="primary" onClick={() => setShow(true)} className="mx-2">
        Make payment
      </Button>
      <Modal
        show={show}
        onHide={() => {
          setFormData({
            note: "",
            rentalId: rentals[0].rentalId,
            amount: rentals[0].price,
          });
          setShow(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Make new payment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Monthly Fee: $ {formData.amount}</p>
          <Form.Group className="mb-3">
            <Form.Label>Select rental</Form.Label>
            <Form.Select
              onChange={
                (e) =>{
                
                  setFormData({
                    ...formData,
                    rentalId: e.target.value,
                    amount: rentals.find(
                      (rental) => rental.rentalId == e.target.value
                    ).price,
                  })
                }
                
                
              }
            >
              {rentals.map((rental) => (
                <option key={rental.rentalId} value={rental.rentalId}>
                  Rental ID: {rental.rentalId}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Add note</Form.Label>
            <Form.Control
              value={formData.note}
              onChange={(e) =>
                setFormData({ ...formData, note: e.target.value })
              }
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button disabled={formData.rentalId === 0} onClick={makePayment}>Pay</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default AddPayment;
