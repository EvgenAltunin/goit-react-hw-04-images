import { toast } from 'react-toastify';
import { notificationParams } from 'settings/settings';
import React, { Component } from 'react';
import { ReactComponent as SearchIcon } from '../../icons/search.svg';
import {
  Search,
  Form,
  FormSubmit,
  Input,
} from 'components/Searchbar/Searchbar.styled';

export class Searchbar extends Component {
  state = {
    searchQuery: '',
  };

  handleInputValueChange = event => {
    this.setState({
      searchQuery: event.currentTarget.value.toLowerCase(),
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    const { searchQuery } = this.state;
    const { onFormSubmit } = this.props;

    if (searchQuery.trim() === '') {
      toast.error('Search field must be filled!', notificationParams);
      return;
    }

    onFormSubmit(searchQuery);
    this.formReset();
  };

  formReset() {
    this.setState({ searchQuery: '' });
  }

  render() {
    const { searchQuery } = this.state;
    return (
      <Search>
        <Form onSubmit={this.handleSubmit}>
          <FormSubmit type="submit">
            <SearchIcon width="25" height="25" />
          </FormSubmit>
          <Input
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={searchQuery}
            onChange={this.handleInputValueChange}
          />
        </Form>
      </Search>
    );
  }
}
