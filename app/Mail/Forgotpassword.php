<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class Forgotpassword extends Mailable
{
    use Queueable, SerializesModels;
    public $user;
    public $token;
  
    public function __construct($user,$token)
    {
        $this->user = $user;
        $this->token = $token;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Forgot password',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
      return new Content(
        markdown: 'email.forgotpassword',
        with:[
          'user'=>$this->user,
          'token'=>$this->token
        ],
    );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
