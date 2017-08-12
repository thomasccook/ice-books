<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <meta name="description" content="">
    <meta name="author" content="">
    <link rel="icon" href="../../favicon.ico">

    <title>IceBooks</title>
    
  	<%@include file="../a_common/common_css.jsp" %>	
    
  </head>

  <body>

    <div class="container" style="text-align:center">
      <form action="j_spring_security_check" name="f" method="post" class="form-signin">
      	<H1>IceBooks</H1>
        <h2 class="form-signin-heading">Please sign in</h2>
        <table align="center" border="0">
        	<tr>
        		<td><label for="inputEmail" class="sr-only">Username</label></td>
        		<td><input type="text" id="inputEmail"  name="j_username" class="form-control" placeholder="Login" required autofocus></td>
        	</tr>
        	<tr>
        		<td><label for="inputPassword" class="sr-only">Password</label></td>
        		<td><input type="password" id="inputPassword" name="j_password" class="form-control" placeholder="Password" required></td>
        	</tr>
        	<tr>
        		<td></td>
        		<td><button class="btn btn-lg btn-primary btn-block" type="submit" name="Submit" value="Submit">Sign in</button></td>
        	</tr>
        </table>
      </form>
    </div> 
  </body>
</html>