import 'semantic-ui-css/semantic.min.css'
import React, { Component } from 'react'
import SmartDataTable from 'react-smart-data-table'
import { Grid, } from 'semantic-ui-react'

const semanticUI = {
    segment: 'ui basic segment',
    message: 'ui message',
    input: 'ui icon input',
    searchIcon: 'search icon',
    rowsIcon: 'numbered list icon',
    table: 'ui compact selectable table',
    select: 'ui dropdown',
    refresh: 'ui labeled primary icon button',
    refreshIcon: 'sync alternate icon',
    change: 'ui labeled secondary icon button',
    changeIcon: 'exchange icon',
    checkbox: 'ui toggle checkbox',
    loader: 'ui active text loader',
    detailIcon: 'list alternate teal icon',
    editIcon: 'edit green icon',
    deleteIcon: 'trash red icon',
    customIcon: 'tasks yellow icon',
}
class Table extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // Data Tabel
            listData        : this.props.listData,
            filterData      : '',
            // Data Tabel
        }
        
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.listData !== this.props.listData) {
            const listData = this.props.listData;
            this.setState({listData});
        }
    }
    getHeaders() {
        return {
            actions: {
                text: 'Actions',
                sortable: false,
                filterable: false,
                transform: (value, idx, row) => (
                    <div>
                        {
                            this.props.handleDetail ?   
                            <i
                                className={semanticUI.detailIcon}
                                style={{ cursor: 'pointer' }}
                                onClick={e => this.props.handleDetail(e, idx, row)}
                                onKeyDown={e => this.props.handleDetail(e, idx, row)}
                                role='button'
                                tabIndex='0'
                            /> : ''
                        }
                        {
                            (row.status && row.status==='Open') && this.props.handleEdit ?   
                            <i
                                className={semanticUI.detailIcon}
                                style={{ cursor: 'pointer' }}
                                onClick={e => this.props.handleEdit(e, idx, row)}
                                onKeyDown={e => this.props.handleEdit(e, idx, row)}
                                role='button'
                                tabIndex='0'
                            /> : ''
                        }
                        {
                            (row.status && row.status==='Open') && this.props.handleCustom && row[this.props.customRow]==='CUSTOM'?   
                            <i
                                className={semanticUI.detailIcon}
                                style={{ cursor: 'pointer' }}
                                onClick={e => this.props.handleCustom(e, idx, row)}
                                onKeyDown={e => this.props.handleCustom(e, idx, row)}
                                role='button'
                                tabIndex='0'
                            /> : ''
                        }
                        {
                            (row.status && row.status==='Open') && this.props.handleDelete ? 
                            <i
                                className={semanticUI.deleteIcon}
                                style={{ cursor: 'pointer' }}
                                onClick={e => this.props.handleDelete(e, idx, row)}
                                onKeyDown={e => this.props.handleDelete(e, idx, row)}
                                role='button'
                                tabIndex='0'
                            /> : ''
                        }
                    </div>
                ),
            },
        }
    }
    handleOnChange = ({ target: { name, value } }) => {
        this.setState({ [name]: value });
    }
    handleDetail = (e, idx, row) => {
        this.props.handleDetail(e, idx, row);            
    }
    handleDelete = (e, idx, row) => {
        this.props.handleDelete(e, idx, row);            
    }
    handleCustom = (e, idx, row) => {
        this.props.handleCustom(e, idx, row);            
    }
    
    render() {
        const {
            listData, filterData, 
        } = this.state
        const headers = this.getHeaders()
        return (
            <div>
                <Grid style={{textAlign:'left'}}>
                    <Grid.Row>
                        <Grid.Column width={8}>
                            <div className={semanticUI.input}>
                                <input
                                    type='text'
                                    value={filterData}
                                    name='filterData'
                                    placeholder='Filter results...'
                                    onChange={this.handleOnChange}
                                />
                                <i className={semanticUI.searchIcon} />
                            </div>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <SmartDataTable
                                data={listData}
                                dataKey=''
                                headers={headers}
                                name='test-table'
                                className={semanticUI.table}
                                filterValue={filterData}
                                perPage='50'
                                sortable
                                withToggles
                                withLinks
                                withHeader
                                loader={(
                                    <div className={semanticUI.loader}>
                                        Loading...
                                    </div>
                                )}
                                parseBool={{
                                    yesWord: 'Indeed',
                                    noWord: 'Nope',
                                }}
                                parseImg={{
                                    style: {
                                        border: '1px solid #ddd',
                                        borderRadius: '2px',
                                        padding: '3px',
                                        width: '60px',
                                    },
                                }}
                                dynamic
                                emptyTable={(
                                    <div className={semanticUI.message} align='center'>
                                        There is no data available to display.
                                    </div>
                                )}
                            />
                            <div className={semanticUI.message}>
                                <p style={{textAlign:'center'}}>
                                    {`Total rows in the table: ${listData.length}`}
                                </p>
                            </div>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        );
    }
}

export default Table;