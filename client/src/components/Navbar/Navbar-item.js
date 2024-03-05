function NavbarItem({name, relLinkToPage = ''})
{
    return (
        <li>
            <a href= {relLinkToPage} className={name}>{name}</a>
        </li>
    )
}

export default NavbarItem