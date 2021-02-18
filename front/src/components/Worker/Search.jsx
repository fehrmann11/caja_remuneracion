import { Button,Navbar,Nav,Form,FormControl } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

const Search = ({search,searchInput,handleSearch,ruta}) =>{

    let history = useHistory();

    const add = () => {
        history.push(`/${ruta}/-1`)
    }

    return (
        <div id="buscador">
                <Navbar bg="light" expand="lg">


                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Button onClick={add} variant="outline-primary">agregar empleador</Button>
                        </Nav>
                        <Form inline>
                            <FormControl name="text" value={search} ref={searchInput} onChange={handleSearch}  type="text" placeholder="Buscar" className="mr-sm-2" />

                        </Form>
                    </Navbar.Collapse>
                </Navbar>
            </div>
    )

}

//FormControl value={textBuscar} ref={search}  onChange={handleChange}
//onClick={addEnterprise} Button agregar empleador

export default Search;