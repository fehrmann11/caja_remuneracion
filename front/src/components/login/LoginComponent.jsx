import { useState,useRef } from 'react';
import './LoginComponent.css'
import SecurityService from '../../api/SecurityService'
import {useHistory } from 'react-router-dom';


const LoginComponent = () => {
    const [userName, setUserName] = useState("ingrese su usuario");
    const [password, setPassword] = useState("ingrese su contraseña");
    const [hasLoginFailed, setHasLoginFailed] = useState(false);
    const us = useRef(null);
    const pw = useRef(null);
    let history = useHistory();


    /*Está función se lanza al momento de dar clic en el botón la cual hace una promesa
    a través de SecurityService y obtiene un token, una vez obtenido el token se va a
    la pantalla management (que es welcomeComponent)*/
    const loginClicked = () => {
        SecurityService.AuthenticationService(userName, password)
            .then((response) => {
                SecurityService.registerSuccessfulLoginForJwt(userName, response.data.jwt)
                history.push(`/management`)
            }).catch(() => {
                setHasLoginFailed(true);
            })
    }

    //Esta función guarda el usuario y contraseña en las variables userName y password
    const handleChange = () => {
        setUserName(us.current.value);
        setPassword(pw.current.value);
    }

    //Formulario
    return (
        <div className="wrapper fadeInDown">
            <div id="formContent">
                {/*icono de la empresa */}
                <div className="fadeIn first">
                    <img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMTEhUTEhIVFRUVFRUVFRUVFRUVFRYXFRUWFhUVFRUYHSggGBolGxUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OGhAQGi0fHx8tLS0rLS0rLS0tLS0tLS0rLS0tLS0tLS0tLS0tLS0tLS0tLS0tKy0tKy0tLS0tKystK//AABEIAOEA4QMBIgACEQEDEQH/xAAbAAABBQEBAAAAAAAAAAAAAAAEAAIDBQYBB//EAD8QAAEDAgQDBQcCBQMCBwAAAAEAAhEDBAUSITEGQVETYXGBkSIyUqGxwdEU8BUjM0JiNHLhU/EHFiRDc6LC/8QAGQEAAwEBAQAAAAAAAAAAAAAAAAECAwQF/8QAJxEAAgICAgEEAgIDAAAAAAAAAAECEQMhEjFBBBMyUSJhBUJxgaH/2gAMAwEAAhEDEQA/AMzh9OpUEtnor+xw99MDvKi4TZLAtW2kXctlIiqxtopUv933WQoYa4nM3VbXHx2obT2khNNq2n7AGw3RQA3CVoXOJcNlocSYAB4oChWbRpbw4yUJQxvtfZI1BhUhPosrmvBiNIWExG5/nkRAnVejOpSPJYLHC1tfJGp3KmQMnwazz1A9vujdeg026BUXDmH5GDodlfhCQzNcWe8zxVg+5y02abgKu4t3Z4oynTzMpzsmR5ZVcRVdAUNZ3EsCJ4qEQOSqaBlkBJk8dsluboZokoqwe0uGpVI9pzo+0GVwkwOqGyFE07iJaheI/wCmntYJaQ75obiTVm/4QaJfiZO1qhrXdxR9LFg8dIVTTtzlfqgMOoOzmXCOibQRNPaVy8O7lneIrjK4c1eYfAkSs9jPZ5/aJPqkux0W/Cj8zCrzLqqbhZ7MhyjSVd59dkpdk0Q3NKUBVtFavrRyUd1UzBIaZQ04DyCrG1xIsOiqagOcqDIZ38YSkkzVNp2jQfxY9AkqbsWfF9Ulnwiae9P7NDw0/IcoGy2Vk+QvOMNuXZ9Ct/h05QSt0ZsEu6QNdpnZOxStTiZ12TLgHtfZHJZDiCtVY8Ajc6R3JkmhvofUYB8K5cUGU4I3nVUtHEHAhzhqBsjbyoSwOIiU0DejVWl4HN8lQXOBdtc53e6ELY3JDSW6noi7fFHPLW6g6SkwNRRAaAByUuZCscABJUb7qdGpjKji46t8V2hcEsZyAQnEbTLZKrcXxkW9Jg957th0QR/Zk3Et8ObwI71kbjGhs2fEBVuJ3rqriXHf08u5HYBgpqmTMJGsY2ya1uq9SBTDj3gfco+pgd44Aue4f4yfothhOFMpgQPNWZt+/wC6nkarEjz1+C3caOI8yo3XF3RaW1QXs75PmCvTKdIdfp81DdWYeIIEJ8w9pM8xZiIcDEieR5IWzHtkzutJj/CcS+jvzb+O9Y6zec5DtCCdDoQe9O0ZShRfUakZoVBfglyum1hqgq1NpPvR6IS2Qy24QaQ0z1V9m1VHw7Ua0OEyrJ1USpl2TQYSFJVywq1tbVEVKwKkVFLd1gX6LlBwHKSUVXtWl4jmnvtAHAAodGlgXYO6fVdV52X+QSS0ADhWHHtIPJbugQ0ALJ4Xfj2naSpDxAGjVapUBoH1P54Hcs/j9yO2YHNgTuU9mMsJFT4QqbHsXbWcHhujfqhiC8XIzAtUl9WLqbdYCqf1Re0nboh/1DyQDsE12KfRo7Ita3vVQzE3U6xIjU7qEF7tBJQ1exqSJaUmJPRr7fGKc/zHo5uP0B7pWHpYPVdsFZ2nC1eQTAVITci44nuRla/lE/Jea4ndmpUzE8xHgOS2fHU06dJh5gz5f8rBs/fr+EjRIJs7I1Hta0SSV6fhGGNosA581Q8A4d71UjuH3Wxq0gRrss5M6capAVTEmgezqfOPUIF/EwYfbA8gfoja1RgMaBcqUqVRuoDvELPmbcQzDMXpVvdcPDmrItWRt8GY1+anpBWnoOIbqjnYcR7mdQsPxpwvP/qKI1Edo0DcfEO8LUXWN0qZ9p3OFO25ZUacpDgR9d1aZnNHmdCygT1UFfDy46Fcxap2NdzDIh2neCdFZOrs0AgaarVHBluJ3DWCgCHEGVY2FZj3EBUFekwukvV9gdvTYZJ5bIlEzjJhtWi0Ak8kO64pqTFbunBCqm31ECPypSsbbFVxFoqNIGyt7ZzHkSNSs7Tr031WwNOe6uKGJU+00Hu6bJyWgTdlz+kb0SQ/8fZ8PyXFhcvs00Y+hRcw+0T4Ll2RI1RdxcCocwGirKzSXaLeRfZZUtoB0Tm5Yy5Vy3cAI5p5hJDH9gRTJUFF2wKOzfy1XUj7Q8VS7In8TTcND2z7MjqtJWtGnUhMwm3a1ggakIi5eQ0wmCegeycJ92FaAoG3lwBhV2JcTUqD8j94lAzM/wDiZXb2jGSJDST5nT6FY+hRJIHUr1OswVKhc+nTyuDQZaC7bQZig6+A021aZaNA6fQE/hZ8zp9lpKyzwGz7KixvOJPiVYVaOYQo6dRE03BQ2aJGdxHhxrySQTpG5VTbcPdkTkNSSIEukDXlG/mt9CiewKSyjw63eIzbx4KyqzkPWJTXVtdBPgpaAJ3T4obMq/C6dxo/fxQ7MIqW7ppOJHw/jqmXeB1qNQmjWc0FwMO9poE6gdPNWGG3lR7iyq2HN58nDk4KKcfINJ+DDcYOz12kH3mtJHQzCvLG8tiB/KmBBcROqoOIDmu6kbNMfKfqVX27qgBE7rZtpaOOStm5t8atg4gUAcu+gRmHcR0Kr8jaQBjmANl59b0qgkh0LtCi9pzB0Ecwpcm/IlH9G3veK6LHuY6hqDHKPVPr4rSAk0miRI2WNNuaklzpPMoetQn3qpgbAnZFy1sKp7RdOx5rnB7aYEeCLZjjHML4aDOxhZehQaJGfREm0pZDL/OQqlZP+S//AIt/i1JZ2KX/AFT6pKbl9lcUW1JkBdqVmiBzROJ0ez09Fnf01Wo7QHdbPszRcsgp4MBQ2tlUp+/HhK7Vfql5KLCm6aaAY72h4hHWh9gygnEEiOqa7Jn0z0vDqwyN1Gykq3LBoXBZrDqJDmmTEbSli1pLg4E7jmhsUTSWL5mNkrjDKTzmcwE9SFLhbfZHgiqpSKKeqX9mG0xLzDjpsCZPhpoiLoSQFC7FqVOp2L3gP3AO5B2jqla3AqEkbSQPJZdM7m7VolyIiixJjVKkCY7PCHrPmUqz41OgCDdilAb1Go0Ncn0B3ttcPblo1RSObV2UPJb3TsVx1/UoUzmzVXN5hoBdtGmyNpYrQds8KatTDhyKl76L/JbaFYtzsBcNTuFy5sWxIEQp7cgaDko7yv7J8Cmvpmct7R5BdGXVXxq9xd5E6ISp7ohehYng9q8+/GgEDTZBjh+ziO0PqrcbYQUlHoyduf5ZKYXy0rT3WF0WtLabp8VRV6RZPs+inhstzdbQNh0mQRyVRcAzsr6yqSSIRd7wxVgPp6yJI5+SqLUezCePJll+KujO2bDroinW57Mp1K2eHEHQ7Qjn2FQsIWnk5Xoz36U9ySsf4PV711UOzccRYd7pzg5d/BQ29SmIiAicLwx9Zjs7t1aYZwY0ODnZnAbK9vaI1HsprrBKrz2gJM7NU3/limG5qzw1y39a37On/Lplzo0C86xnh++rvLntMcmiYCfDyTzH9lZsbl7WfNR0zYj+7VVjeDbk7UyU93CFx/0nJ1+gv9mrs69u+MrwI21Ul5ZEiWnMsi3hm4b/AO08eAK0eAUK7B7YqHoIKTimLlRaW14WiDopK+Iq0oYcazNWQehWZxrCjRa59V+n9rW7lZuNbLi70Z3iupmu7Z43zsb/APYD7rYWoykjzXneE3rLi9oABwyOc72iCCGtJHzAXoNycpzeqykdeJaLRjk4lVlG8CK7cFQmaPRO+Dug6lhS1OUDwEIsPBCa9qVMqM6M/eYbSn4T8Q0+iDa2pbkPD8zJ10gx9Fo3W/WCmPogaFTvydPvWq7Osr8xz1Vdf3InKTvujKsDbksjcXBc4u6nTw5JqVO2Th9I89xTosru2a/UQhaNgCeShtSXPDddTCnxW3dSdlBOolae8r5Uar+PcIvDz3LaCaOFB26CuLIZywEJjLl45lTUAzNmJMolnT8Bi/jMmO7naAqdk1hzEbLRWd81zNDtyQzsh5qZ+GtFPM0xKynHmdeKEfTvT+Wv9lDizc7pa2DK62uQIgK+bYUTSLs8PHKfsqcmdgtorXZ4XqISjNt/ZD+pPwhJS9n3JKjn5Gi4VtM0OeSAV6Tb1aYaAIheY2GJZGgdEPjvEjyG06RLS4wT0CqOkE5OWmerm+pbZmz4qOpdMAjQryVuFw3Nndmic0mZUmBcQvk0qjpc0xPVDlZCiek2d60ToN0XWvmxpCwmI4r2ZGo1CEdxJ/kEuTHxPQ/17ByCY7FGDkF547iP/IIapxFOgOpRyYcT0CljIaXOOywvEF66s973cwQB0HIBCXVetUqtPa5aTN6Yb7xIOrnT15Qu1tR3hYznejpx462YzhUZbxp6Zh66L1VzJbqvOxb9ndCoPde7TxjUL0m2dLB4J3aLjop7q1jZBmtUb3hX9enIVZWorOiwZmLEbouniw5Kuq0d9EK+nCOQcDT08QBCk7cH7LICq4bFGULh0TBKpO9E/EMxi4eKZbSGZ7pHgOZWPbcvByPEOCv7W+qNe4uYTOyqcRpVKlTMKZWnt3oWP1cscrXQ/Cqzu2Z/uVtxZVIqNj4VVYZbVBVYSwwCrTi2jUdUbkbIyoWPwXP1ilNSrr9lOy5cpm1ShBYV/hUjbC46BHtjfrvpf9B8Su3NEDcrSXAeMPBB9oAFZ+vgtw6JA9Fqatq82Yp/3RCpQo58nqJTd30ZD9Y57Z57FG2jyGRKJtsAqAIpuElEcaQ8/q8mWKjLwV+c9UlZfwpJXS+jnsmr0HUz/j1Tm4MKsOD+/ROZNwMrpa3bvKsLa27Eho93knRNj/4ccuXNyiVUUeE2tqdpmOaZ3K0wHeukhVxQuTK24wltQgvEwmtwCl8IVl2gXKtw1o1KTpdgrfQD/A6PwD0Q11Y0KYkNGYbeKkusSJ0GirKr53WE8q6R0QxeWC3DnAyOXLqpLe5DtQuNP9p8j1VZf03Uj2jBI/vb1HxDvC5uzpLG6pDeNCR5OWjwW6lgBWYs7ttRu8tcETYXJpPyuOm4PIjr+U4utA1ZrKhUFRkrjK8hNe/orBENS2lBVbFWdKtyKdXqtaNVFDszta2DAXHZoJM9ydw9f5vZf1+qr+OLstt8oMOqvAHgDmP0+aqOHcRMw7R7fQju/eipXHaM5VLTPSTTb8IXQxvQKno4g7rI5T0RtHEGncQuqOSLOWWOSDAxvQJOaDuFynB2MqTItVTMnoj7NvQLrWDouuak1FAKB0XB4JyTDqgRyO5NLR0U0pj9eSAGSElH2aSYEdKkx4lvoosTeGtaJ1lR17GTLHZfBR0MOdnzPdmhQ20XSZYUwYTiY3UFa8DdBqVXV65duVlLN9GsMN9htxfAe6q99ck6lROKaFzubfZ0Rgl0dcuJFMzTtr9PMqDShtVsjeOh6LlvWDgQdxoVKGczuh7miZzs97mOTh08UrAqbqxdRfNP3Trl+oCKoXYqDI45XD3T0PeimVw8QfMdCoX2TXa7943BHVNu+wD8OxKPYqS1w8f2R3q1bWnnI6rMuaQIeMzRsf7m+amt65bqwl47veHiOYQpBRe1ndCh85J1MqvdioHvyzxH3UdW+EEgknoBPz5KrEyl40rZ6lITo1xHqAuULUF1N0bOHnqp+2z5mvZUAPwDblqY123U2GU8rxq4x8WWfMAqpEotjEiDqANvlp6p8nfQ/JRRrPVENWdlUPpXRb1H09VbWmJTo71VO4Job00/fRaRyOJEsakadrpOicQqSxviww7ZXdJ4cJGy64ZFI4543E6Cm5oKkyKJ4ghaGZLK4n5FwtQA1JOypIAr3ua3f/lBXN1OjdAh88bgkncyFCaq45ZHI7ceNRHFyaSkU1zv3z8li2apCTC7pr9PVOA66Dp+SuwpKIzTnf05J4SKQKAHFMIBT5SASGV1zZyczXQe/Y+KCti6ls7cyQdde5Xb6IPJDvoAHbTmmAOMRd/dTDh1b+CgLnEKU6AgnkR9FYVLADVpLZ6HT0KrqttNVodBOVxBAg8hqEKhOwSjdGs8tpmSxuYAmATMDXu3UtelX0dUdp/iZ9SpGYc5plpa0kQXESY3jvR1vamPacXabn8Jt/QkvsBFJ50HqSrHDbcN05xM8yusYBqf3oibFm7jz+imyiZzVK1Jw0XWpiOvTJT37KNADiiLS5LDp5hQu2TSU1KuhONqmaanUBAI2KZV5aIDCLgzk66j7q0c13OF6EJclZ584cXR0PS7ROyBd7MKyBnaJJ/ZhJAGVc9QObOqkJXCvLPTI2v7vLonQk/r5FOQMSSTCkkM4VxdldCAOhdCYV1rpQA9NcF0ldAQBA5ukKvrUyKjDAJIcBy6K1qBA4hScWy0AuaZAOx5EHuIKaEycWWSC6DO3cfBKq3Qz6flCWd4XicxMaFrt2mNQfyigwuOu3Qc/FDQovWwYU/aAOw1j8qxYg7psbco9DuiqLhASKJTsuBOTUAPOyicpeSjTEdCZUOyeN0xwkJDJbetle0jqtEc/VZB74eAtQy5cWjQbLr9M+0cnqV0w1rtEg5R0n6ap+cdV1HKOzJJucdUkAZKUlwlMD15Z6g8dEmO+Wh8kx7ohLn4j5hICRp1XSmjqkSgZxPaVGntQA4hRZSFMClCAONcukKNwhPY5AHSoXOU0KN9NMRnrip2VZr/AO1xyv7wdj4grTNGiz/E1vNIxvIE+as8Hrl1BjjvlAPlp9lT6sld0SVGzPfI9UrU+zB5aeicBIhMpug+Ov5UlBbAmldaVx6AHtKZmXWlMeAgB5TDunJlRIYA901o6R9FpbF5Ld9tFlLZ01XnvPy0Whwqr7UdRz7lvhdTMcyuJbNiN10kdV1ngEvILuOAbIXE+O4JIAzDioGu1hTOQtQ6rymeqiaqV3NoD0P/AB90x+yZRfIhABDE4lQsdOs8lM1AHYXQupIA4ngpkJBAD3BRTqpA5NcgCRrkiop6J7SgAHG6Wake7X0Q/DtSaMdHuHrr91ZVgCCJGo6qq4cbDajebapHyCv+pHkt6bVFVOX5fNEhQXLQd9joVJRJTcnFA2lUQWndpAGmpB2+6NcxsTAQFncw6hIuHf5BQi8byB9PwEw4gP2HfhOmK0Ea9PUpj/L0Q1S86BzvAR8ymUaryYLWgdxLj66BFBZFZU4Lu9x+qsrc6j5quoHmOfyhGUyhOtjatUaSk1o01+alAb3qKxe4gGBsEXDugXpraPLfZD7HekpYPQJIAyJQ1YaIidEPV2K8s9UdRdIUAdDinUHJXDNiDBSA7Rf3cyi2u8VVvf002PjyR9F8jc/JABIXC4dQoyR/3lcB6afIIAlz+J8lzN3epUZeBu4DxKjddU/jB7gihBOvd9V0k9R6IL9Y2dA4+Rj1KjdfHZtMk+R+idCsPJHxfMJNjx+aCZWqGZa1umgO8zp1/ZUlqXc4nuEBDVAnYWY2hVmH0Xsq1pbDXOaWnSCYgqxKrcXq9m3OWBwkB08gdJjmmhTvtFgapOxB8CFA+vOm0nc7kjk0KouLyrRgtoU8hIhzIG+onTTdNqcQOByumm4cnMkeoP2VKD8GUpyLQ1ms6nrH/wCjzXLuq/TKJEjMAdxzAKFsMQY7QlpJ6fcHVWdDKJE6cu7u+STTi9lwSa0NeXPDQGkQIJDi2ROgICmo2/gPD8qRjBuPkpJhDk2UopEf6Yc9VFf1xTYTpOw8SiDUWfx6qXVAzpB9Ukhtj8PrOc0yYg+G6tWKusaQmI5fQ/8AKsmFJlIvcLpktBnyR+Q/EqjCK0+z01VtlXo4ncUeblVSZ3KfiXU3J3JLQgyZUL+aSS8o9UHobqap7qSSQAR28kdbe6EkkMCYbnwCbd+4Ukk0SzM1v6h81e2nuhJJUyUNudwjme5++hSSUlLsG5oml90kkiyTmgcY/oVf9h+oXUlUeyJdMEf/AKNv/wAbfsosd/0vk36hJJXHswyGYwj+szx+xWwo+6VxJGXs0w9MNstgiqiSSzNCBu6pcW/1B/2t+iSSqJL7DbHceB+qMprqSkssMC/qHwWgakku7B8Dz8/zHJJJLYyP/9k="
                        alt="logo"
                        id="icon" />
                </div>
                {/*Formulario */}
                <div >

                    <input type="text"
                        id="login"
                        className="fadeIn second"
                        name="userName"
                        placeholder={userName}
                        ref={us}
                        onChange={handleChange} />

                    <input type="password"
                        id="password"
                        className="fadeIn third"
                        name="password"
                        placeholder={password}
                        ref={pw}
                        onChange={handleChange} />

                    <button className="btn btn-primary" onClick={loginClicked}>iniciar sesión</button>

                </div>
                {hasLoginFailed && <div className="alert alert-warning" role="alert">
                    Tu usuario o contraseña son inválidos
                </div>}


            </div>
        </div>
    )


}

export default LoginComponent;