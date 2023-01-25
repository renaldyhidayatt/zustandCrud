import axios from 'axios';
import { useEffect, useState } from 'react';
import { Container, Button, Table, Input } from 'reactstrap';
import AddModal from './component/addModal';
import EditModal from './component/editModal';
import {
  useMyAddModal,
  useMyCounter,
  useMyCrud,
  useMyEditModal,
} from './store/mycounter';

function App() {
  const URL = 'https://jsonplaceholder.typicode.com/users';
  const count = useMyCounter((state) => state.count);
  const { data, addData, item, getItem, editData, deleteData } = useMyCrud();

  const { editModal, showModalTrueEdit, showModalFalseEdit } = useMyEditModal();

  const addModal = useMyAddModal((state) => state.addModal);
  const showModalTrue = useMyAddModal((state) => state.showModalTrue);
  const showModalFalse = useMyAddModal((state) => state.showModalFalse);

  const incrementCount = useMyCounter((state) => state.increment);
  const decrementCount = useMyCounter((state) => state.decrement);

  const loadAxios = () => {
    axios
      .get(URL)
      .then((res) => {
        const nuewData = [];
        const dataAxios = res.data;

        dataAxios.map((item) => {
          nuewData.push({
            id: item.id,
            name: item.name.split(' ')[0],
            lastname: item.name.split(' ')[1],
            email: item.email,
            admin: Math.random() < 0.5,
            language: 'ES',
          });
        });
        addData(nuewData);
      })
      .catch((err) => {
        throw new Error(err);
      });
  };

  const editFunction = (item) => {
    showModalTrueEdit();
    getItem(item);
  };

  const deleteFunction = (id) => {
    let option = window.confirm('Are you sure you want to delete' + id);
    if (option == true) {
      deleteData(id);
    }
  };

  useEffect(() => {
    console.log(data);
  }, []);

  return (
    <Container>
      <br />
      <Button onClick={() => loadAxios()} className="m-2">
        Load with Axios
      </Button>
      <Button color="primary" onClick={incrementCount} className="m-2">
        Increment
      </Button>
      <Button color="primary" onClick={decrementCount} className="m-2">
        Decrement
      </Button>
      <Button color="secondary" onClick={showModalTrue} className="m-2">
        Modal
      </Button>
      <p className="text-center">{count}</p>
      <Table responsive>
        <thead>
          <tr>
            <th>id</th>
            <th>name</th>
            <th>lastname</th>
            <th>admin</th>
            <th>email</th>
            <th>language</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.lastname}</td>
              <td>
                <Input type="checkbox" disabled="true" checked={item.admin} />
              </td>
              <td>
                <a href={`mailto:${item.email}`}>{item.email}</a>
              </td>
              <td>{item.language}</td>
              <td>
                <Button color="warning" onClick={() => editFunction(item)}>
                  Edit
                </Button>{' '}
                <Button color="danger" onClick={() => deleteFunction(item.id)}>
                  Hapus
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <AddModal
        data={data}
        setData={addData}
        addModal={addModal}
        showModalTrue={showModalTrue}
        showModalFalse={showModalFalse}
      />
      <EditModal
        data={data}
        editData={editData}
        editModal={editModal}
        showModalTrueEdit={showModalTrueEdit}
        showModalFalseEdit={showModalFalseEdit}
        item={item}
      />
    </Container>
  );
}

export default App;
