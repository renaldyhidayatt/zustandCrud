import {
  Button,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from 'reactstrap';

export default function AddModal(props) {
  const handlerSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const lastname = e.target.lastname.value;
    const email = e.target.email.value;
    const language = e.target.language.value;
    const admin = e.target.admin.checked;
    const id = props.data.length + 1;
    props.setData([
      { id, name, lastname, admin, email, language },
      ...props.data,
    ]);

    props.showModalFalse();
  };

  return (
    <div>
      <Modal isOpen={props.addModal} toggle={props.showModalTrue}>
        <Form onSubmit={handlerSubmit}>
          <ModalHeader>
            <h1>Hello</h1>
          </ModalHeader>
          <ModalBody>
            <FormGroup row className="mt-2">
              <Label sm={3}>Name</Label>
              <Col sm={9}>
                <input
                  className="form-control"
                  type="text"
                  name="name"
                  placeholder="Juan"
                  required
                />
              </Col>
            </FormGroup>

            <FormGroup row className="mt-2">
              <Label sm={3}>Last Name</Label>
              <Col sm={9}>
                <input
                  className="form-control"
                  type="text"
                  required
                  placeholder="Hdez"
                  name="lastname"
                />
              </Col>
            </FormGroup>

            <FormGroup row className="mt-2">
              <Label sm={3}>Email</Label>
              <Col sm={9}>
                <input
                  className="form-control"
                  type="email"
                  required
                  placeholder="hello@hello.com"
                  name="email"
                />
              </Col>
            </FormGroup>

            <FormGroup row className="mt-2">
              <Label sm={3}>Select</Label>
              <Col sm={9}>
                <Input type="select" name="language">
                  <option>ES</option>
                  <option>EN</option>
                  <option>PT</option>
                </Input>
              </Col>
            </FormGroup>

            <FormGroup row className="mt-2">
              <Label sm={3}>Is Admin</Label>
              <Col sm={9}>
                <Input type="checkbox" name="admin" />
              </Col>
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" type="submit">
              Insert
            </Button>{' '}
            <Button color="secondary" onClick={props.showModalFalse}>
              Cancel
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
    </div>
  );
}
