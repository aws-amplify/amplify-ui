import React, { useState } from 'react';
import { Card, Grid } from '@aws-amplify/ui-react';
import { FieldLabeler } from '../../../../components/FieldLabeler';
import { Example } from '../../../../components/Example';

export const GridDemo = () => {
  return (
    <Grid
      templateColumns="300px 300px"
      autoRows="100px"
      justifyContent="center"
      gap="20px"
      row
    >
      <Card columnSpan={2}>1</Card>
      <Card columnSpan={1} column="span 2">
        2
      </Card>
      <Card>3</Card>
      <Card>4</Card>
      <Card>5</Card>
      <Card>6</Card>
      <Card>7</Card>
      <Card>8</Card>
      <Card>9</Card>
      <Card>10</Card>
      <Card>11</Card>
      <Card>12</Card>
      <Card>13</Card>
      <Card>14</Card>
      <Card>15</Card>
    </Grid>
  );
};
