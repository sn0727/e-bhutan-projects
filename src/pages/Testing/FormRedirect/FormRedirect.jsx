const FormRedirect = () => {
  const formHtml = `
    <html>
      <head>
        <!-- Optional: Add any necessary meta tags or styles -->
      </head>
      <body>
        <form id="panForm" action="https://preprod.assisted-service.egov-nsdl.com/SpringBootFormHandling/newPanReq" method="post">
          <textarea name="req" style="display: none;">{"reqEntityData":{"txnid":"PS4579",...}}</textarea>
        </form>
        <script>
          // Submit the form on page load
          document.getElementById('panForm').submit();
        </script>
      </body>
    </html>
  `;

  const newTab = window.open('');
  if (newTab) {
    newTab.document.write(formHtml);
  }
};

// Trigger the function, e.g., in a useEffect
useEffect(() => {
  openFormInNewTab();
}, []);
