using System;
using System.Collections.Generic;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using BlazorSSR.Client.States;
using BlazorSSR.Shared;
using Microsoft.AspNetCore.Components;
using MudBlazor;

namespace BlazorSSR.Client.Shared
{
    public partial class LoginDialog
    {
        [CascadingParameter]
        MudDialogInstance MudDialog { get; set; }


        [Inject]
        private IdentityAuthenticationStateProvider authStateProvider { get; set; }

        [Inject]
        private ISnackbar Snackbar { get; set; }

        LoginModel loginModel { get; set; } = new LoginModel();

        bool success;

        string error { get; set; }

        private async Task OnValidSubmit()
        {
            error = null;
            try
            {
                await authStateProvider.Login(loginModel);
                MudDialog.Cancel();
            }
            catch (Exception ex)
            {
                error = ex.Message;
            }
        }

        private void Cancel()
        {
            MudDialog.Cancel();
        }
    }
}
