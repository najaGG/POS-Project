import Template from "../components/Template";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function Product() {
    return (
        <>
            <Template>
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src="path/to/your/image.jpg" />
                    <Card.Body>
                        <Card.Title>Card Title</Card.Title>
                        <Card.Text>
                            Some quick example text to build on the card title and make up the
                            bulk of the card's content.
                        </Card.Text>
                        <Button variant="primary">Go somewhere</Button>
                    </Card.Body>
                </Card>
            </Template>
        </>
    );
}

export default Product;
