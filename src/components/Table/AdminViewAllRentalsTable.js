import React, { useEffect, useMemo, useState } from 'react';
import { Container } from 'react-bootstrap';
import { SelectColumnFilter } from './Filter';
import TableContainer from './TableContainer';
import axios from 'axios'
import { useAuth0 } from '@auth0/auth0-react';
import { useEnv } from '../../context/env.context';

const AdminViewAllRentalsTable = () => {

    const { user, getAccessTokenSilently } = useAuth0()
    const { audience, apiServerUrl } = useEnv()
    const role = `${audience}/roles`

    const [data, setData] = useState([]);

    const fetchAllRentals = async () => {

        const token = await getAccessTokenSilently()
        // if userid is bigger than 21, they use oauth2
        await axios.get(`${apiServerUrl}/api/v1/rentals/search?pageSize=20000`, {
            headers: {
                authorization: `Bearer ${token}`
            }
        }).then(res => {  // after fetched all meeting data, get the user data using userId in meeting data
            Promise.all(res.data.content.map(i =>
                fetch(`${apiServerUrl}/api/v1/houses/${i.userHouse.houseId}`)
            )).then(res2 => Promise.all(res2.map(r => r.json())))
                .then(result => {
                    Promise.all(res.data.content.map((it) => {
                        result.map((data, i) => {
                            if (it.userHouse.houseId === result[i].houseId) {
                                setData(prevList =>
                                    [...prevList, {
                                        rentalId: it.rentalId,
                                        houseName: result[i].name,
                                        startDate: it.startDate,
                                        endDate: it.endDate,
                                        depositAmount: it.depositAmount,
                                        monthlyFee: it.monthlyFee,
                                        payableFee: it.payableFee
                                    }])
                            }
                        })
                    }))
                })
        })
    }

    useEffect(() => {
        fetchAllRentals();
    }, []);

    const columns = useMemo(
        () => [
            {
                Header: '#',
                accessor: 'rentalId',
                Filter: SelectColumnFilter,
                filter: 'equals',
            },
            {
                Header: 'House Name',
                accessor: 'houseName',
            },
            {
                Header: 'Start Date',
                accessor: 'startDate',
            },
            {
                Header: 'EndDate',
                accessor: 'endDate',
            },
            {
                Header: '($) Deposit Amount',
                accessor: 'depositAmount',
            },
            {
                Header: '($) Monthly Fee',
                accessor: 'monthlyFee',
            },
            {
                Header: '($) Payable Fee',
                accessor: 'payableFee',
            },
        ],
        []
    );

    return (
        <Container style={{ marginTop: 50 }}>
            <TableContainer
                columns={columns}
                data={data}
            />
        </Container>
    );
};

export default AdminViewAllRentalsTable;