import React, {useState} from 'react'
import { Search } from '@material-ui/icons'
import { InputGroup, FormControl, Form, Button} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { routePaths } from '../../@services/constants'
const SearchPopover = () => {
    const navigate = useNavigate()
    const [keyword, setKeyword] = useState('')
    const searchSubmitHandler = e => {
        e.preventDefault()
        if(keyword.trim()){
            navigate(`/Products/search/${keyword}`)
            window.location.reload(false).scrollTo(0, 0)
        }
        else {
            navigate(routePaths.allProducts)
        }
    }
    return (
        <div className='popover_content_search'>
            <Form className="d-flex" onSubmit = {searchSubmitHandler}>
                
                    <FormControl type="search"
                        placeholder="Search" aria-label="Search" aria-describedby="basic-addon2" onChange = {e => setKeyword(e.target.value)}
                    />
                    <Button variant = 'dark' type = 'submit' id="basic-addon2" value = 'search'>Search</Button>
                
            </Form>
        </div>
    )
}

export default SearchPopover