import * as React from 'react';
import {
  Alert,
  Badge,
  Button,
  Card,
  Collection,
  Divider,
  Flex,
  Heading,
  Image,
  Rating,
  SelectField,
  StepperField,
  SwitchField,
  Text,
  View,
} from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { PAINTINGS } from './paintings';

export default function Home() {
  const [currentPainting, setCurrentPainting] = React.useState(PAINTINGS[0]);
  const [image, setImage] = React.useState(PAINTINGS[0].src);
  const [frame, setFrame] = React.useState(true);
  const [quantity, setQuantity] = React.useState(1);
  const [size, setSize] = React.useState('');
  const [error, setError] = React.useState(false);

  const handleAddToCart = () => {
    if (size === '') {
      setError(true);
      return;
    }
    alert(
      `Added to cart!\n${quantity} ${size} "${currentPainting.title}" by ${
        currentPainting.artist
      } with ${frame ? 'a' : 'no'} frame`
    );
  };

  return (
    <View width="100%" maxWidth="50rem" padding={{ base: 0, large: '2rem' }}>
      <Card variation="elevated">
        <Flex
          direction={{ base: 'column', large: 'row' }}
          justifyContent="space-evenly"
        >
          <Flex direction="column" gap="5rem" alignItems="center">
            <View width="15rem" height="19rem">
              <Image
                src={image}
                alt={`${currentPainting.title} abstract painting`}
                width="100%"
                height="21rem"
                border={frame ? '3px solid black' : ''}
              />
            </View>
            <Collection
              type="grid"
              items={PAINTINGS}
              templateColumns="1fr 1fr 1fr 1fr"
              templateRows="1fr 1fr"
              width="14rem"
            >
              {(item, index) => (
                <Flex
                  width="100%"
                  onMouseOver={() => setImage(item.src)}
                  onMouseLeave={() => setImage(currentPainting.src)}
                  key={index}
                  justifyContent="center"
                >
                  <Image
                    src={item.src}
                    alt={`${item.title} abstract painting`}
                    width="2rem"
                    height="2.5rem"
                    onClick={() => setCurrentPainting(item)}
                    borderRadius="5px"
                    padding="3px"
                    marginBottom="1rem"
                    style={{
                      cursor: 'pointer',
                      ...(currentPainting.src === item.src && {
                        border: '1px solid #e77600',
                        boxShadow: 'rgba(0, 0, 0, 0.35) 0px 3px 8px',
                      }),
                    }}
                  />
                </Flex>
              )}
            </Collection>
          </Flex>
          <Flex direction="column" justifyContent="space-between">
            <Flex direction="column" gap="0.7rem">
              <Flex justifyContent="space-between" alignItems="center">
                <Heading level={3}>{currentPainting.title}</Heading>
                <Flex height="1.8rem">
                  {currentPainting.bestSeller ? (
                    <Badge variation="success">Bestseller</Badge>
                  ) : null}
                  {currentPainting.isNew ? (
                    <Badge variation="info">New</Badge>
                  ) : null}
                  {currentPainting.limitedSupply ? (
                    <Badge variation="warning">Limited supply</Badge>
                  ) : null}
                </Flex>
              </Flex>
              <Text fontWeight="bold">{currentPainting.artist}</Text>
              <Flex
                direction={{ base: 'column', large: 'row' }}
                alignItems="baseline"
              >
                <Rating
                  value={currentPainting.avgRating}
                  fillColor="#f4a41d"
                ></Rating>
                <Text fontSize="small" fontWeight="lighter">
                  {currentPainting.reviews} reviews
                </Text>
              </Flex>
              <Divider />
              <Flex alignItems="baseline">
                <Text fontSize="medium" fontWeight="bold">
                  Price:
                </Text>
                <Text fontSize="large" color="#B12704" fontWeight="bold">
                  {currentPainting.price}
                </Text>
              </Flex>
              <Text fontSize="small" paddingBottom="1rem">
                {currentPainting.description}
              </Text>
              {currentPainting.readyForPickup ? (
                <Text>
                  <Text variation="success" as="span">
                    Ready within 2 hours
                  </Text>{' '}
                  for pickup inside the store
                </Text>
              ) : null}
              <SwitchField
                label={frame ? 'Frame' : 'No frame'}
                labelPosition="end"
                isChecked={frame}
                onChange={(e) => {
                  setFrame(e.target.checked);
                }}
                isDisabled={!currentPainting.inStock}
              />
              <SelectField
                label="Size"
                labelHidden
                variation="quiet"
                placeholder="Select your size"
                value={size}
                onChange={(e) => {
                  e.target.value !== '' && setError(false);
                  setSize(e.target.value);
                }}
                hasError={error}
                errorMessage="Please select a size."
                isDisabled={!currentPainting.inStock}
              >
                <option value="Small" label='Small (12x16")' />
                <option value="Medium" label='Medium (18x24")' />
                <option value="Large" label='Large (24x36")' />
                <option value="X-Large" label='X-Large (30x40")' disabled />
              </SelectField>
              {!currentPainting.inStock ? (
                <Alert variation="error">Out of stock!</Alert>
              ) : null}
            </Flex>
            <Flex
              justifyContent="space-between"
              direction={{ base: 'column', large: 'row' }}
            >
              <Flex alignItems="center" gap="5px">
                <Text>Qty:</Text>
                <StepperField
                  label="Quantity"
                  value={quantity}
                  onStepChange={setQuantity}
                  min={0}
                  max={10}
                  step={1}
                  labelHidden
                  width="10rem"
                  isDisabled={!currentPainting.inStock}
                />
              </Flex>
              <Button
                variation="primary"
                onClick={handleAddToCart}
                disabled={!currentPainting.inStock || !quantity}
              >
                Add to Cart
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Card>
    </View>
  );
}
