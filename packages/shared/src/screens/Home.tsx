import React from 'react';
import { ListItem, IconButton, Avatar, Heading } from 'material-bread';

const album = <Avatar type="icon" content="album" contentColor={'#ececec'} color={'#a3a3a3'} size={40} />;
const iconFav = <IconButton name="favorite" size={24} color="#6e6e6e" />;

export default function Home(): JSX.Element {
  return (
    <>
      <Heading
        text={'Albums'}
        style={{
          alignSelf: 'flex-start',
          marginLeft: 20,
          fontSize: 20,
        }}
      />
      <ListItem text={'Back in Black'} secondaryText={'AC/DC'} media={album} actionItem={iconFav} />
      <ListItem text={'Hotel California'} secondaryText={'Eagles'} media={album} actionItem={iconFav} />
      <ListItem text={'Dark Side of the Moon'} secondaryText={'Pink Floyd '} media={album} actionItem={iconFav} />
      <ListItem text={'Led Zeppelin IV'} secondaryText={'Led Zeppelin'} media={album} actionItem={iconFav} />
    </>
  );
}
